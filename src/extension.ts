import * as Vscode from 'vscode';
import Initializer from './components/Initializer';
import Wsd from './components/Wsd';
import Asker from './components/Asker';
import Registry from './components/Registry';
import Workspace from './components/Workspace';
import Storage from './components/Storage';
import WsClient from './components/WsClient';
import { Zipper } from './components/Zipper';
import { handleClickStatusBarItem } from './components/StatusBar';

export function activate(context: Vscode.ExtensionContext) {
    const workspace = new Workspace();
    const registry = new Registry(context);
    const storage = new Storage(context, workspace);
    const asker = new Asker(storage);
    const wsClient = new WsClient();
    const wsd = new Wsd(asker, workspace, storage, wsClient);
    const initializer = new Initializer(context, workspace, storage);
    const zipper = new Zipper(workspace);

    registry.register('initializeWorkspace', () => initializer.handleInitWorkspace());
    registry.register('connect', () => wsd.handleConnect());
    registry.register('disconnect', () => wsd.handleDisconnect());
    registry.register('run', () => wsd.handleRun());
    registry.register('stop', () => wsd.handleStop());
    registry.register('uploadProject', () => wsd.handleUploadProject());
    registry.register('uploadFile', () => wsd.handleUploadFile());
    registry.register('snapshot', () => wsd.handleSnapshot());
    registry.register('zip', () => zipper.handleZip());
    registry.register('clickStatusBarItem', () => handleClickStatusBarItem());
    registry.listenOnDidChangeConfiguration('autodn.enable', () => initializer.handleDidChangeEnable());

    initializer.handleDidChangeEnable();
}

export function deactivate() {}
