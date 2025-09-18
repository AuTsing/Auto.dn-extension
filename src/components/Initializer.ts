import * as Vscode from 'vscode';
import * as Fs from 'node:fs/promises';
import * as Path from 'node:path';
import * as Url from 'node:url';
import Output from './Output';
import Workspace from './Workspace';
import Asker from './Asker';
import Storage from './Storage';
import StatusBar from './StatusBar';

export default class Initializer {
    private readonly context: Vscode.ExtensionContext;
    private readonly workspace: Workspace;
    private readonly asker: Asker;
    private readonly storage: Storage;

    constructor(context: Vscode.ExtensionContext, workspace: Workspace, asker: Asker, storage: Storage) {
        this.context = context;
        this.workspace = workspace;
        this.asker = asker;
        this.storage = storage;
    }

    private getDtsUrl(): string {
        const root = this.context.extensionPath;
        const dts = Path.join(root, 'assets', 'dts', 'lib.autodn.d.ts');
        const url = Url.pathToFileURL(dts);
        return url.href;
    }

    private async initializeDenoJson(): Promise<void> {
        const denoJson = await this.workspace.readDenoJson();
        const dtsUrl = this.getDtsUrl();
        const types = denoJson?.compilerOptions?.types ?? [];

        if (types.includes(dtsUrl)) {
            return;
        }

        const filteredTypes = types.filter(it => !it.endsWith('lib.autodn.d.ts'));
        filteredTypes.push(dtsUrl);

        denoJson.compilerOptions = denoJson.compilerOptions ?? {};
        denoJson.compilerOptions.types = filteredTypes;

        await this.workspace.writeDenoJson(denoJson);
    }

    private async initializeMainJs(): Promise<void> {
        const maybeMainJsPaths = this.workspace.getMaybeMainJsPaths();

        for (const maybeMainJsPath of maybeMainJsPaths) {
            const maybeMainJsPathExist = await Fs.access(maybeMainJsPath)
                .then(() => true)
                .catch(() => false);
            if (maybeMainJsPathExist) {
                return;
            }
        }

        const extensionFolder = this.context.extensionPath;
        const mainJsTemplatePath = Path.join(extensionFolder, 'assets', 'templates', 'main.ts');
        const mainJsTemplateContent = new Uint8Array(await Fs.readFile(mainJsTemplatePath));

        await this.workspace.writeMainJs(mainJsTemplateContent);
    }

    private async initializeConfiguration(): Promise<void> {
        const denoConfig = this.workspace.getDenoConfiguration();
        if (denoConfig.get('enable') !== true) {
            await denoConfig.update('enable', true);
            await new Promise(resolve => setTimeout(() => resolve(null), 1000));
        }

        const config = this.workspace.getConfiguration();
        if (config.get('enable') !== true) {
            await config.update('enable', true);
            await new Promise(resolve => setTimeout(() => resolve(null), 1000));
        }
    }

    async initializeWorkspace() {
        try {
            await this.initializeMainJs();
            await this.initializeDenoJson();
            await this.initializeConfiguration();
            Output.printlnAndShow('工作区初始化成功');
        } catch (err) {
            Output.eprintln('工作区初始化失败:', err);
        }
    }

    async updateDts() {
        try {
            const update = this.storage.getUpdateDts();
            if (!update) {
                return;
            }

            const denoJson = await this.workspace.readDenoJson();
            const dtsUrl = this.getDtsUrl();
            const types = denoJson?.compilerOptions?.types ?? [];
            if (types.includes(dtsUrl)) {
                return;
            }

            await this.initializeDenoJson();
            await new Promise(resolve => setTimeout(() => resolve(null), 1000));
            await Vscode.commands.executeCommand('deno.client.restart');
            Output.printlnAndShow('类型定义文件已更新');
        } catch (err) {
            Output.eprintln('类型定义文件更新失败:', err);
        }
    }

    async handleDidChangeConfiguration() {
        const config = this.workspace.getConfiguration();
        if (config.get('enable') === true) {
            StatusBar.instance?.handleShowStatusBar();
            await this.updateDts();
        } else {
            StatusBar.instance?.handleHideStatusBar();
        }
    }
}
