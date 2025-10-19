import * as Vscode from 'vscode';
import * as Fs from 'node:fs/promises';
import * as Path from 'node:path';
import * as Jsonfile from 'jsonfile';
import { NS, DENO_EXTENSION_ID, DENO_NS } from '../values/Constants';

export interface WorkspaceFile {
    name: string;
    absolutePath: string;
    remotePath: string;
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
        if (!workspaceFolders) {
            throw new Error('未打开工程');
        }
        if (workspaceFolders.length > 1) {
            throw new Error('暂不支持多工程工作区');
        }
        return workspaceFolders[0];
    }

    private async readdirRecursively(
        absolutePath: string,
        relativePath: string = '',
        files: WorkspaceFile[] = [],
    ): Promise<WorkspaceFile[]> {
        const dirents = await Fs.readdir(absolutePath, { withFileTypes: true });
        for (const dirent of dirents) {
            if (dirent.name.startsWith('.')) {
                continue;
            }
            if (dirent.isFile()) {
                const file: WorkspaceFile = {
                    name: dirent.name,
                    absolutePath: Path.join(absolutePath, dirent.name).replace(/\\/g, '/'),
                    remotePath: Path.join(relativePath, dirent.name).replace(/\\/g, '/'),
                };
                files.push(file);
                continue;
            }
            if (dirent.isDirectory()) {
                await this.readdirRecursively(
                    Path.join(absolutePath, dirent.name),
                    Path.join(relativePath, dirent.name),
                    files,
                );
                continue;
            }
        }
        return files;
    }

    async getWrokspaceFiles(): Promise<WorkspaceFile[]> {
        const workspaceFiles = [] as WorkspaceFile[];
        const workspaceFolder = this.getWorkspaceFolder();

        const denoConfig = await this.readDenoConfig();
        const imports = Object.values(denoConfig.imports ?? {});
        const localImports = imports.filter(it => typeof it === 'string' && it.startsWith('.')) as string[];
        const localImportsAbsolutePaths = localImports.map(it => Path.resolve(workspaceFolder.uri.fsPath, it));
        for (const path of localImportsAbsolutePaths) {
            const name = Path.basename(path);
            const files = await this.readdirRecursively(path, 'Projects/' + name);
            workspaceFiles.push(...files);
        }

        const files = await this.readdirRecursively(workspaceFolder.uri.fsPath, 'Projects/' + workspaceFolder.name);
        workspaceFiles.push(...files);

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
        const denoConfigPath = Path.join(workspaceFolder.uri.fsPath, 'deno.json');
        return denoConfigPath;
    }

    async readDenoConfig(): Promise<DenoConfig> {
        const denoConfigPath = this.getDenoConfigPath();
        const denoConfigPathExist = await Fs.access(denoConfigPath)
            .then(() => true)
            .catch(() => false);
        if (denoConfigPathExist === false) {
            return {};
        }
        const denoConfigJson = await Fs.readFile(denoConfigPath, { encoding: 'utf-8' });
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
            Path.join(workspaceFolder.uri.fsPath, 'main.ts'),
            Path.join(workspaceFolder.uri.fsPath, 'main.js'),
        ];
        return maybeEntryPointPaths;
    }

    private getEntryPointPath(): string {
        const workspaceFolder = this.getWorkspaceFolder();
        const mainJsPath = Path.join(workspaceFolder.uri.fsPath, 'main.ts');
        return mainJsPath;
    }

    async writeEntryPoint(content: Uint8Array): Promise<void> {
        const mainJsPath = this.getEntryPointPath();
        await Fs.writeFile(mainJsPath, content);
    }
}
