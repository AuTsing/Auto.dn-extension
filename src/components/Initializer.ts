import { ExtensionContext, commands } from 'vscode';
import { access, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { printlnAndShow, eprintln } from '../debug/output';
import Workspace from './Workspace';
import Storage from './Storage';
import { handleShowStatusBar, handleHideStatusBar } from './StatusBar';

const { executeCommand } = commands;

export default class Initializer {
    constructor(
        private readonly context: ExtensionContext,
        private readonly workspace: Workspace,
        private readonly storage: Storage,
    ) {}

    private getDtsUrl(): string {
        const root = this.context.extensionPath;
        const dts = join(root, 'assets', 'dts', 'lib.autodn.d.ts');
        const url = pathToFileURL(dts);
        return url.href;
    }

    async isNeedToUpdateDts(): Promise<boolean> {
        const dtsUrl = this.getDtsUrl();
        const denoConfig = await this.workspace.readDenoConfig();
        const types = denoConfig?.compilerOptions?.types ?? [];
        return !types.includes(dtsUrl);
    }

    private updateDtsUrl(origin: string): string {
        const originWithoutVersion = origin.replace(/\d+\.\d+\.\d+/, '{version}');
        const current = this.getDtsUrl();
        const currentWithoutVersion = current.replace(/\d+\.\d+\.\d+/, '{version}');

        if (originWithoutVersion === currentWithoutVersion) {
            return current;
        } else {
            return origin;
        }
    }

    private async updateDts() {
        const denoConfig = await this.workspace.readDenoConfig();
        const types = denoConfig?.compilerOptions?.types ?? [];
        const updatedTypes = types.map(it => this.updateDtsUrl(it));
        const current = this.getDtsUrl();
        if (!updatedTypes.includes(current)) {
            updatedTypes.push(current);
        }
        denoConfig.compilerOptions = denoConfig.compilerOptions ?? {};
        denoConfig.compilerOptions.types = updatedTypes;

        await this.workspace.writeDenoConfig(denoConfig);
    }

    private async initEntryPoint() {
        const maybeEntryPointPaths = this.workspace.getMaybeEntryPointPaths();

        for (const maybeEntryPointPath of maybeEntryPointPaths) {
            const maybeEntryPointPathExist = await access(maybeEntryPointPath)
                .then(() => true)
                .catch(() => false);
            if (maybeEntryPointPathExist === true) {
                return;
            }
        }

        const extensionFolder = this.context.extensionPath;
        const entryPointTemplatePath = join(extensionFolder, 'assets', 'templates', 'main.ts');
        const entryPointTemplateContent = new Uint8Array(await readFile(entryPointTemplatePath));

        await this.workspace.writeEntryPoint(entryPointTemplateContent);
    }

    private async initDenoConfig() {
        await this.updateDts();
    }

    private async initConfiguration() {
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
            printlnAndShow('工作区初始化成功');
        } catch (err) {
            eprintln('工作区初始化失败:', err);
        }
    }

    async handleUpdateDts() {
        try {
            if (this.storage.getEnable() !== true) {
                return;
            }

            if (this.storage.getUpdateDts() === false) {
                return;
            }

            if ((await this.isNeedToUpdateDts()) === false) {
                return;
            }

            await this.updateDts();
            await new Promise(resolve => setTimeout(() => resolve(null), 1000));
            await executeCommand('deno.client.restart');

            printlnAndShow('类型定义文件已更新');
        } catch (err) {
            eprintln('类型定义文件更新失败:', err);
        }
    }

    async handleToggleStatusBar() {
        if (this.storage.getEnable() === true) {
            handleShowStatusBar();
        } else {
            handleHideStatusBar();
        }
    }

    async handleDidChangeEnable() {
        await this.handleToggleStatusBar();
        await this.handleUpdateDts();
    }
}
