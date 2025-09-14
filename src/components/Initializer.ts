import * as Vscode from 'vscode';
import * as Fs from 'fs';
import * as FsPromises from 'fs/promises';
import * as Path from 'path';
import * as Url from 'url';
import * as Jsonfile from 'jsonfile';
import Output from './Output';
import Workspace from './Workspace';
import { DENO_CMD_CACHE, DENO_CMD_RESTART } from '../values/Constants';
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

            const denofaConfig = this.workspace.getDenofaConfiguration();
            if (denofaConfig.get('enable') !== true) {
                await denofaConfig.update('enable', true);
                await new Promise(resolve => setTimeout(() => resolve(null), 1000));
            } else {
                Output.println('Denofa 插件已开启，跳过开启');
            }
            const denoConfig = this.workspace.getDenoConfiguration();
            if (denoConfig.get('enable') !== true) {
                await denoConfig.update('enable', true);
                await new Promise(resolve => setTimeout(() => resolve(null), 1000));
            } else {
                Output.println('Deno 插件已开启，跳过开启');
            }

            Output.printlnAndShow('Denofa 工作区初始化成功');
        } catch (err) {
            Output.eprintln('Denofa 工作区初始化失败:', err);
        }
    }

    async initializeExtension() {
        StatusBar.instance?.toggleStatusBar();
        await this.updateDts();
    }

    async updateDts() {
        try {
            const denofaConfig = this.workspace.getDenofaConfiguration();
            if (denofaConfig.get('enable') !== true) {
                return;
            }

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

            const update = await this.asker.askForIsUpdateDts(latestVersion);
            if (!update) {
                return;
            }

            types.push(dtsUrl);
            denoJson.compilerOptions = denoJson.compilerOptions ?? {};
            denoJson.compilerOptions.types = types;
            const workspaceFolder = this.workspace.getWorkspaceFolder();
            const denoJsonPath = Path.join(workspaceFolder.uri.fsPath, 'deno.json');
            await Jsonfile.writeFile(denoJsonPath, denoJson, { spaces: 4 });

            Output.printlnAndShow('更新类型定义文件成功');
        } catch (err) {
            Output.eprintln('更新类型定义文件失败:', err);
        }
    }
}
