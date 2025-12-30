import * as Vscode from 'vscode';
import Workspace from './Workspace';

export enum Configuration {
    Enable = 'enable',
    UpdateDts = 'updateDts',
}

export default class Storage {
    private readonly state: Vscode.Memento;
    private readonly workspace: Workspace;

    constructor(context: Vscode.ExtensionContext, workspace: Workspace) {
        this.state = context.globalState;
        this.workspace = workspace;
    }

    getWsUrls(): string[] {
        return this.state.get('wsUrls', []);
    }

    async setWsUrls(wsUrls: string[] = []) {
        await this.state.update('wsUrls', wsUrls);
    }

    async addWsUrl(wsUrl: string) {
        const wsUrls = this.getWsUrls();
        const index = wsUrls.indexOf(wsUrl);
        if (index > -1) {
            wsUrls.splice(index, 1);
        }
        wsUrls.push(wsUrl);
        await this.setWsUrls(wsUrls);
    }

    getEnable(): boolean {
        return this.workspace.getConfiguration().get<boolean>(Configuration.Enable, false);
    }

    async setEnable(value: boolean) {
        await this.workspace.getConfiguration().update(Configuration.Enable, value);
    }

    getUpdateDts(): boolean {
        return this.workspace.getConfiguration().get<boolean>(Configuration.UpdateDts, true);
    }

    async setUpdateDts(value: boolean) {
        await this.workspace.getConfiguration().update(Configuration.UpdateDts, value);
    }
}
