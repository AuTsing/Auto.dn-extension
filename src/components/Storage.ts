import * as Vscode from 'vscode';
import Workspace from './Workspace';

export enum Configuration {
    Enable = 'enable',
    UpdateDts = 'updateDts',
}

export default class Storage {
    private readonly state: Vscode.Memento;
    private readonly configuration: Vscode.WorkspaceConfiguration;

    constructor(context: Vscode.ExtensionContext, workspace: Workspace) {
        this.state = context.globalState;
        this.configuration = workspace.getConfiguration();
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
        return this.configuration.get<boolean>(Configuration.Enable, false);
    }

    async setEnable(value: boolean) {
        await this.configuration.update(Configuration.Enable, value);
    }

    getUpdateDts(): boolean {
        return this.configuration.get<boolean>(Configuration.UpdateDts, true);
    }

    async setUpdateDts(value: boolean) {
        await this.configuration.update(Configuration.UpdateDts, value);
    }
}
