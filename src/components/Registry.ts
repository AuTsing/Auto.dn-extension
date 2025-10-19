import * as Vscode from 'vscode';
import { NS } from '../values/Constants';

export default class Registry {
    constructor(private readonly context: Vscode.ExtensionContext) {}

    register(command: string, callback: () => any) {
        this.context.subscriptions.push(Vscode.commands.registerCommand(`${NS}.${command}`, callback));
    }

    listenOnDidChangeConfiguration(section: string, callback: () => any) {
        this.context.subscriptions.push(
            Vscode.workspace.onDidChangeConfiguration(it => {
                if (it.affectsConfiguration(section) === true) {
                    callback();
                }
            }),
        );
    }
}
