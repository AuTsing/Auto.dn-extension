import { readdir, access, readFile, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import vscode from 'vscode';
import jsonfile from 'jsonfile';
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
    getWorkspaceFolder(): vscode.WorkspaceFolder {
        const workspaceFolders = vscode.workspace.workspaceFolders;
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
                    absPath: resolve(absPath, dirent.name),
                    relPath: join(relPath, dirent.name),
                } satisfies WorkspaceFile;
                files.push(file);
                continue;
            }
            if (dirent.isDirectory()) {
                await this.readdirRecursively(resolve(absPath, dirent.name), join(relPath, dirent.name), files);
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

    getDenoConfiguration(): vscode.WorkspaceConfiguration {
        const denoExtension = vscode.extensions.getExtension(DENO_EXTENSION_ID);
        if (!denoExtension) {
            throw new Error('未检测到 Deno 官方插件，请先安装插件后再进行操作');
        }
        return vscode.workspace.getConfiguration(DENO_NS);
    }

    getConfiguration(): vscode.WorkspaceConfiguration {
        return vscode.workspace.getConfiguration(NS);
    }

    private getDenoConfigPath(): string {
        const workspaceFolder = this.getWorkspaceFolder();
        const denoConfigPath = resolve(workspaceFolder.uri.fsPath, 'deno.json');
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
        await jsonfile.writeFile(denoConfigPath, denoConfig, { spaces: 4 });
    }

    getMaybeEntryPointPaths(): string[] {
        const workspaceFolder = this.getWorkspaceFolder();
        const maybeEntryPointPaths = [
            resolve(workspaceFolder.uri.fsPath, 'main.ts'),
            resolve(workspaceFolder.uri.fsPath, 'main.js'),
        ];
        return maybeEntryPointPaths;
    }

    private getEntryPointPath(): string {
        const workspaceFolder = this.getWorkspaceFolder();
        const mainJsPath = resolve(workspaceFolder.uri.fsPath, 'main.ts');
        return mainJsPath;
    }

    async writeEntryPoint(content: Uint8Array): Promise<void> {
        const mainJsPath = this.getEntryPointPath();
        await writeFile(mainJsPath, content);
    }

    resolveRelProjects(...paths: string[]): string {
        return join('Projects', ...paths).replace(/\\/g, '/');
    }

    resolveRelResources(...paths: string[]): string {
        return join('Resources', ...paths).replace(/\\/g, '/');
    }
}
