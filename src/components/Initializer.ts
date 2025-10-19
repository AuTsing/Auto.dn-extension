import * as Vscode from 'vscode';
import * as Fs from 'node:fs/promises';
import * as Path from 'node:path';
import * as Url from 'node:url';
import Output from './Output';
import Workspace from './Workspace';
import Storage from './Storage';
import StatusBar from './StatusBar';

export default class Initializer {
    constructor(
        private readonly context: Vscode.ExtensionContext,
        private readonly workspace: Workspace,
        private readonly storage: Storage,
    ) {}

    private getDtsUrl(): string {
        const root = this.context.extensionPath;
        const dts = Path.join(root, 'assets', 'dts', 'lib.autodn.d.ts');
        const url = Url.pathToFileURL(dts);
        return url.href;
    }

    private async updateDts(): Promise<void> {
        const denoConfig = await this.workspace.readDenoConfig();
        const dtsUrl = this.getDtsUrl();
        const types = denoConfig?.compilerOptions?.types ?? [];
        if (types.includes(dtsUrl)) {
            return;
        }

        const filteredTypes = types.filter(it => !it.endsWith('lib.autodn.d.ts'));
        filteredTypes.push(dtsUrl);
        denoConfig.compilerOptions = denoConfig.compilerOptions ?? {};
        denoConfig.compilerOptions.types = filteredTypes;

        await this.workspace.writeDenoConfig(denoConfig);
    }

    private async initEntryPoint(): Promise<void> {
        const maybeEntryPointPaths = this.workspace.getMaybeEntryPointPaths();

        for (const maybeEntryPointPath of maybeEntryPointPaths) {
            const maybeEntryPointPathExist = await Fs.access(maybeEntryPointPath)
                .then(() => true)
                .catch(() => false);
            if (maybeEntryPointPathExist === true) {
                return;
            }
        }

        const extensionFolder = this.context.extensionPath;
        const entryPointTemplatePath = Path.join(extensionFolder, 'assets', 'templates', 'main.ts');
        const entryPointTemplateContent = new Uint8Array(await Fs.readFile(entryPointTemplatePath));

        await this.workspace.writeEntryPoint(entryPointTemplateContent);
    }

    private async initDenoConfig(): Promise<void> {
        await this.updateDts();
    }

    private async initConfiguration(): Promise<void> {
        const denoConfig = this.workspace.getDenoConfiguration();
        if (denoConfig.get('enable') !== true) {
            await denoConfig.update('enable', true);
            await new Promise(resolve => setTimeout(() => resolve(null), 1000));
        }

        const enable = this.storage.getEnable();
        if (enable !== true) {
            await this.storage.setEnable(true);
            await new Promise(resolve => setTimeout(() => resolve(null), 1000));
        }
    }

    async handleInitWorkspace() {
        try {
            await this.initEntryPoint();
            await this.initDenoConfig();
            await this.initConfiguration();
            Output.printlnAndShow('工作区初始化成功');
        } catch (err) {
            Output.eprintln('工作区初始化失败:', err);
        }
    }

    async handleUpdateDts() {
        try {
            if (this.storage.getEnable() !== true) {
                return;
            }

            const update = this.storage.getUpdateDts();
            if (update === false) {
                return;
            }

            await this.updateDts();

            await new Promise(resolve => setTimeout(() => resolve(null), 1000));
            await Vscode.commands.executeCommand('deno.client.restart');

            Output.printlnAndShow('类型定义文件已更新');
        } catch (err) {
            Output.eprintln('类型定义文件更新失败:', err);
        }
    }

    async handleToggleStatusBar() {
        if (this.storage.getEnable() === true) {
            StatusBar.instance?.handleShowStatusBar();
        } else {
            StatusBar.instance?.handleHideStatusBar();
        }
    }

    async handleDidChangeEnable() {
        await this.handleToggleStatusBar();
        await this.handleUpdateDts();
    }
}
