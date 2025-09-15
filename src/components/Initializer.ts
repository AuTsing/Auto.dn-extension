import * as Vscode from 'vscode';
import * as Fs from 'fs';
import * as FsPromises from 'fs/promises';
import * as Path from 'path';
import * as Url from 'url';
import * as Jsonfile from 'jsonfile';
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

    private async getDtsUrl(): Promise<string> {
        const root = this.context.extensionPath;
        const dts = Path.join(root, 'assets', 'dts', 'lib.autodn.d.ts');
        const url = Url.pathToFileURL(dts);
        return url.href;
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

    async initializeWorkspace() {
        try {
            const workspaceFolder = this.workspace.getWorkspaceFolder();
            const denoJsonPath = Path.join(workspaceFolder.uri.fsPath, 'deno.json');
            const denoJson = await this.workspace.getDenoJson();
            const dtsUrl = await this.getDtsUrl();
            const types = denoJson?.compilerOptions?.types ?? [];
            if (!types.includes(dtsUrl)) {
                types.push(dtsUrl);
            }
            denoJson.compilerOptions = denoJson.compilerOptions ?? {};
            denoJson.compilerOptions.types = types;
            Jsonfile.writeFileSync(denoJsonPath, denoJson, { spaces: 4 });

            const root = this.context.extensionPath;
            const mainTs = Path.join(workspaceFolder.uri.fsPath, 'main.ts');
            const mainJs = Path.join(workspaceFolder.uri.fsPath, 'main.js');
            if (!Fs.existsSync(mainTs) && !Fs.existsSync(mainJs)) {
                const mainTsTemplate = Path.join(root, 'assets', 'templates', 'main.ts');
                const mainTsContent = new Uint8Array(await FsPromises.readFile(mainTsTemplate));
                await FsPromises.writeFile(mainTs, mainTsContent);
            } else {
                Output.println('main.ts/main.js 已存在，跳过创建');
            }

            const config = this.workspace.getConfiguration();
            if (config.get('enable') !== true) {
                await config.update('enable', true);
                await new Promise(resolve => setTimeout(() => resolve(null), 1000));
            } else {
                Output.println('插件已开启，跳过开启');
            }
            const denoConfig = this.workspace.getDenoConfiguration();
            if (denoConfig.get('enable') !== true) {
                await denoConfig.update('enable', true);
                await new Promise(resolve => setTimeout(() => resolve(null), 1000));
            } else {
                Output.println('Deno 插件已开启，跳过开启');
            }

            Output.printlnAndShow('工作区初始化成功');
        } catch (err) {
            Output.eprintln('工作区初始化失败:', err);
        }
    }

    async updateDts() {
        try {
            const updateDts = this.storage.getUpdateDts();
            if (!updateDts) {
                return;
            }

            const denoJson = await this.workspace.getDenoJson();
            const dtsUrl = await this.getDtsUrl();
            const types = denoJson?.compilerOptions?.types ?? [];
            if (types.includes(dtsUrl)) {
                return;
            }

            const update = await this.asker.askForIsUpdateDts();
            if (!update) {
                return;
            }

            types.push(dtsUrl);
            denoJson.compilerOptions = denoJson.compilerOptions ?? {};
            denoJson.compilerOptions.types = types;
            const workspaceFolder = this.workspace.getWorkspaceFolder();
            const denoJsonPath = Path.join(workspaceFolder.uri.fsPath, 'deno.json');
            await Jsonfile.writeFile(denoJsonPath, denoJson, { spaces: 4 });

            await new Promise(resolve => setTimeout(() => resolve(null), 1000));
            await Vscode.commands.executeCommand('deno.client.restart');

            Output.printlnAndShow('更新类型定义文件成功');
        } catch (err) {
            Output.eprintln('更新类型定义文件失败:', err);
        }
    }
}
