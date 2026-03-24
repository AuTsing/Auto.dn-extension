import * as Vscode from 'vscode';
import { readdir, access, readFile, writeFile } from 'node:fs/promises';
import { join, resolve, basename } from 'node:path';
import * as Jsonfile from 'jsonfile';
import { NS, DENO_EXTENSION_ID, DENO_NS } from '../values/Constants';

export interface WorkspaceFile {
    name: string;
    absPath: string;
    relPath: string;
}

export interface DenoConfig {
    imports?: {};
    compilerOptions?: {
        types?: string[];
    };
}

export default class Workspace {
    getWorkspaceFolder(): Vscode.WorkspaceFolder {
        const workspaceFolders = Vscode.workspace.workspaceFolders;
        if (workspaceFolders === undefined) {
            throw new Error('未打开工程');
        }
        if (workspaceFolders.length > 1) {
            throw new Error('暂不支持多工程工作区');
        }
        return workspaceFolders[0];
    }

    getWorkspaceName(): string {
        return this.getWorkspaceFolder().name;
    }

    private async readdirRecursively(
        absPath: string,
        relPath: string = '',
        files: WorkspaceFile[] = [],
    ): Promise<WorkspaceFile[]> {
        const dirents = await readdir(absPath, { withFileTypes: true });
        for (const dirent of dirents) {
            if (dirent.name.startsWith('.')) {
                continue;
            }
            if (dirent.isFile()) {
                const file = {
                    name: dirent.name,
                    absPath: join(absPath, dirent.name).replace(/\\/g, '/'),
                    relPath: join(relPath, dirent.name).replace(/\\/g, '/'),
                } satisfies WorkspaceFile;
                files.push(file);
                continue;
            }
            if (dirent.isDirectory()) {
                await this.readdirRecursively(join(absPath, dirent.name), join(relPath, dirent.name), files);
                continue;
            }
        }
        return files;
    }

    async getWrokspaceFiles(): Promise<WorkspaceFile[]> {
        const workspaceFolder = this.getWorkspaceFolder();
        const dirs = new Array<string>();

        dirs.push(workspaceFolder.uri.fsPath);

        const denoConfig = await this.readDenoConfig();
        const imports = Object.values(denoConfig.imports ?? {});
        const localImports = imports.filter(it => typeof it === 'string' && it.startsWith('.')) as string[];
        for (const it of localImports) {
            const abs = resolve(workspaceFolder.uri.fsPath, it);
            dirs.push(abs);
        }

        const workspaceFiles = new Array<WorkspaceFile>();
        for (const it of dirs) {
            const files = await this.readdirRecursively(it);
            workspaceFiles.push(...files);
        }

        return workspaceFiles;
    }

    getDenoConfiguration(): Vscode.WorkspaceConfiguration {
        const denoExtension = Vscode.extensions.getExtension(DENO_EXTENSION_ID);
        if (!denoExtension) {
            throw new Error('未检测到 Deno 官方插件，请先安装插件后再进行操作');
        }
        return Vscode.workspace.getConfiguration(DENO_NS);
    }

    getConfiguration(): Vscode.WorkspaceConfiguration {
        return Vscode.workspace.getConfiguration(NS);
    }

    private getDenoConfigPath(): string {
        const workspaceFolder = this.getWorkspaceFolder();
        const denoConfigPath = join(workspaceFolder.uri.fsPath, 'deno.json');
        return denoConfigPath;
    }

    async readDenoConfig(): Promise<DenoConfig> {
        const denoConfigPath = this.getDenoConfigPath();
        const denoConfigPathExist = await access(denoConfigPath)
            .then(() => true)
            .catch(() => false);
        if (denoConfigPathExist === false) {
            return {};
        }
        const denoConfigJson = await readFile(denoConfigPath, { encoding: 'utf-8' });
        const denoConfig = JSON.parse(denoConfigJson) satisfies DenoConfig;
        return denoConfig;
    }

    async writeDenoConfig(denoConfig: DenoConfig): Promise<void> {
        const denoConfigPath = this.getDenoConfigPath();
        await Jsonfile.writeFile(denoConfigPath, denoConfig, { spaces: 4 });
    }

    getMaybeEntryPointPaths(): string[] {
        const workspaceFolder = this.getWorkspaceFolder();
        const maybeEntryPointPaths = [
            join(workspaceFolder.uri.fsPath, 'main.ts'),
            join(workspaceFolder.uri.fsPath, 'main.js'),
        ];
        return maybeEntryPointPaths;
    }

    private getEntryPointPath(): string {
        const workspaceFolder = this.getWorkspaceFolder();
        const mainJsPath = join(workspaceFolder.uri.fsPath, 'main.ts');
        return mainJsPath;
    }

    async writeEntryPoint(content: Uint8Array): Promise<void> {
        const mainJsPath = this.getEntryPointPath();
        await writeFile(mainJsPath, content);
    }
}
