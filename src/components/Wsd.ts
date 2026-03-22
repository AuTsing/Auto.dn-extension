import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { randomUUID } from 'crypto';
import { WebSocket } from 'ws';
import Output from './Output';
import Asker from './Asker';
import Workspace from './Workspace';
import StatusBar, { StatusItem } from './StatusBar';
import Storage from './Storage';
import WsClient, {
    LogLevel,
    GetRunningProjects,
    Stop,
    Run,
    Delete,
    Upload,
    Download,
    Log,
    Snapshot,
    UploadResult,
    DownloadResult,
    SetRunningProjectsResult,
    SetRunningProjects,
    RunResult,
    StopResult,
    DeleteResult,
    LogResult,
    SnapshotResult,
    GetRunningProjectsResult,
} from './WsClient';

export default class Wsd {
    private readonly asker: Asker;
    private readonly workspace: Workspace;
    private readonly storage: Storage;
    private readonly wsClient: WsClient;
    private wsc: WebSocket | null;
    private connecting: boolean;
    private snapshoting: boolean;

    constructor(asker: Asker, workspace: Workspace, storage: Storage, wsClient: WsClient) {
        this.asker = asker;
        this.workspace = workspace;
        this.storage = storage;
        this.wsClient = wsClient;
        this.wsc = null;
        this.connecting = false;
        this.snapshoting = false;
    }

    private async connect(url: string): Promise<WebSocket> {
        const conn = await new Promise<WebSocket>((resolve, reject) => {
            if (this.wsc !== null) {
                this.disconnect();
            }
            this.storage.addWsUrl(url);
            const wsc = new WebSocket(url, { handshakeTimeout: 5000 });
            wsc.on('open', () => {
                Output.println(`已连接设备: ${url}`);
                StatusBar.connected(url);
                resolve(wsc);
            });
            wsc.on('error', e => {
                reject(e);
            });
            wsc.on('close', () => {
                if (this.wsc !== null) {
                    Output.println(`已断开设备: ${url}`);
                    StatusBar.disconnected(url);
                    this.wsc = null;
                }
            });
            wsc.on('message', message => {
                this.handleMessage(wsc, message as Uint8Array);
            });
        });
        return conn;
    }

    private disconnect() {
        if (this.wsc === null) {
            throw new Error('未连接设备');
        }
        this.wsc.terminate();
    }

    private async connectAutomatically(): Promise<void> {
        const doing = StatusBar.doing('连接中');
        try {
            const urls = this.storage.getWsUrls();
            if (urls.length === 0) {
                throw new Error('未连接设备');
            }
            if (this.connecting) {
                throw new Error('正在尝试连接设备中');
            }
            this.connecting = true;
            const lastUrl = urls[urls.length - 1];
            Output.println(`未连接设备，尝试连接最后使用设备: ${lastUrl}`);
            this.wsc = await this.connect(lastUrl);
            Output.println('连接设备成功:', lastUrl);
        } catch (e) {
            throw e;
        } finally {
            doing?.dispose();
            this.connecting = false;
        }
    }

    private async getConn(): Promise<WebSocket> {
        if (this.wsc === null) {
            await this.connectAutomatically();
        }
        if (this.wsc === null) {
            throw Error('未连接设备');
        }
        return this.wsc;
    }

    private getProjectName(): string {
        const workspaceFolder = this.workspace.getWorkspaceFolder();
        const name = workspaceFolder.name;
        return name;
    }

    async handleConnect() {
        const doing = StatusBar.doing('连接中');
        try {
            if (this.connecting) {
                throw new Error('正在尝试连接设备中');
            }
            this.connecting = true;
            const url = await this.asker.askForWsUrlWithHistory();
            this.wsc = await this.connect(url);
            Output.println('连接设备成功:', url);
        } catch (e) {
            Output.eprintln('连接设备失败:', e);
        } finally {
            doing?.dispose();
            this.connecting = false;
        }
    }

    handleDisconnect() {
        try {
            this.disconnect();
        } catch (e) {
            Output.eprintln('断开设备失败:', e);
        }
    }

    private handleMessage(conn: WebSocket, data: Uint8Array) {
        try {
            const message = this.wsClient.decode(data);
            switch (true) {
                case message instanceof RunResult:
                    this.wsClient.resolveResult(message);
                    break;
                case message instanceof StopResult:
                    this.wsClient.resolveResult(message);
                    break;
                case message instanceof DeleteResult:
                    this.wsClient.resolveResult(message);
                    break;
                case message instanceof Upload:
                    this.handleUploadMessage(conn, message);
                    break;
                case message instanceof UploadResult:
                    this.wsClient.resolveResult(message);
                    break;
                case message instanceof Download:
                    this.handleDownloadMessage(conn, message);
                    break;
                case message instanceof DownloadResult:
                    this.wsClient.resolveResult(message);
                    break;
                case message instanceof Log:
                    this.handleLogMessage(message);
                    break;
                case message instanceof LogResult:
                    this.wsClient.resolveResult(message);
                    break;
                case message instanceof SnapshotResult:
                    this.wsClient.resolveResult(message);
                    break;
                case message instanceof SetRunningProjects:
                    this.handleSetRunningProjectsMessage(conn, message);
                    break;
                case message instanceof GetRunningProjectsResult:
                    this.wsClient.resolveResult(message);
                    break;
                default:
                    throw new Error(`不支持的命令: ${message}`);
            }
        } catch (e) {
            Output.eprintln(e);
        }
    }

    private async handleUploadMessage(conn: WebSocket, message: Upload) {
        try {
            const path = message.data.path;
            const file = message.data.file;
            await writeFile(path, file);
            const newMessage = new UploadResult(message.id, { success: true, message: '' });
            await this.wsClient.send(conn, newMessage);
        } catch (e) {
            const newMessage = new UploadResult(message.id, {
                success: false,
                message: `${(e as Error).message} ${(e as Error).stack}`,
            });
            try {
                await this.wsClient.send(conn, newMessage);
            } catch (e2) {
                Output.eprintln(e2);
            }
        }
    }

    private async handleDownloadMessage(conn: WebSocket, message: Download) {
        try {
            const path = message.data.path;
            const file = await readFile(path);
            const newMessage = new DownloadResult(message.id, { success: true, message: '', file: file as Uint8Array });
            await this.wsClient.send(conn, newMessage);
        } catch (e) {
            const newMessage = new DownloadResult(message.id, {
                success: false,
                message: `${(e as Error).message} ${(e as Error).stack}`,
                file: new Uint8Array(),
            });
            try {
                await this.wsClient.send(conn, newMessage);
            } catch (e2) {
                Output.eprintln(e2);
            }
        }
    }

    private handleLogMessage(message: Log) {
        switch (message.data.level) {
            case LogLevel.Info:
                Output.println(message.data.message);
                break;
            case LogLevel.Warn:
                Output.wprintln(message.data.message);
                break;
            case LogLevel.Error:
                Output.eprintln(message.data.message);
                break;
            default:
                Output.println(message.data.message);
                break;
        }
    }

    private async handleSetRunningProjectsMessage(conn: WebSocket, message: SetRunningProjects) {
        try {
            StatusBar.running(message.data.projects);
            const newMessage = new SetRunningProjectsResult(message.id, { success: true, message: '' });
            await this.wsClient.send(conn, newMessage);
        } catch (e) {
            const newMessage = new SetRunningProjectsResult(message.id, {
                success: false,
                message: `${(e as Error).message} ${(e as Error).stack}`,
            });
            try {
                await this.wsClient.send(conn, newMessage);
            } catch (e2) {
                Output.eprintln(e2);
            }
        }
    }

    private async run(conn: WebSocket, name: string): Promise<void> {
        const message = new Run(randomUUID(), { name: name });
        await this.wsClient.run(conn, message);
    }

    private async stop(conn: WebSocket, name: string): Promise<void> {
        const message = new Stop(randomUUID(), { name: name });
        await this.wsClient.stop(conn, message);
    }

    private async delete(conn: WebSocket, path: string): Promise<void> {
        const message = new Delete(randomUUID(), { path: path });
        await this.wsClient.delete(conn, message);
    }

    private async upload(conn: WebSocket, path: string, file: Uint8Array): Promise<void> {
        const message = new Upload(randomUUID(), { path: path, file: file });
        await this.wsClient.upload(conn, message);
    }

    private async download(conn: WebSocket, path: string): Promise<Uint8Array> {
        const message = new Download(randomUUID(), { path: path });
        const file = await this.wsClient.download(conn, message);
        return file;
    }

    private async log(conn: WebSocket, level: LogLevel, message: string): Promise<void> {
        const logMessage = new Log(randomUUID(), { level: level, message: message });
        await this.wsClient.log(conn, logMessage);
    }

    private async snapshot(conn: WebSocket): Promise<Uint8Array> {
        const message = new Snapshot(randomUUID(), {});
        const file = await this.wsClient.snapshot(conn, message);
        return file;
    }

    private async getRunningProjects(conn: WebSocket): Promise<string[]> {
        const message = new GetRunningProjects(randomUUID(), {});
        const projects = await this.wsClient.getRunningProjects(conn, message);
        return projects;
    }

    async handleRun() {
        const doings: StatusItem[] = [];
        try {
            const conn = await this.getConn();
            const name = this.getProjectName();

            const projects = await this.getRunningProjects(conn);
            if (projects.includes(name)) {
                const doingStop = StatusBar.doing('停止工程中');
                if (doingStop !== undefined) {
                    doings.push(doingStop);
                }
                await this.stop(conn, name);
            }

            const doingDelete = StatusBar.doing('清理工程中');
            if (doingDelete !== undefined) {
                doings.push(doingDelete);
            }
            await this.delete(conn, name);

            const doingUpload = StatusBar.doing('上传工程中');
            if (doingUpload !== undefined) {
                doings.push(doingUpload);
            }
            const workspaceFiles = await this.workspace.getWrokspaceFiles();
            for (const workspaceFile of workspaceFiles) {
                const file = await readFile(workspaceFile.absolutePath);
                await this.upload(conn, workspaceFile.remotePath, file as Uint8Array);
                // TODO(move remotePath to relativePath)
            }

            const doingRun = StatusBar.doing('运行工程中');
            if (doingRun !== undefined) {
                doings.push(doingRun);
            }
            await this.run(conn, name);
        } catch (e) {
            Output.eprintln('运行工程失败:', e);
        } finally {
            doings.forEach(it => it.dispose());
        }
    }

    async handleStop() {
        const doing = StatusBar.doing('停止工程中');
        try {
            const conn = await this.getConn();
            const name = this.getProjectName();
            await this.stop(conn, name);
        } catch (e) {
            Output.eprintln('停止工程失败:', e);
        } finally {
            doing?.dispose();
        }
    }

    async handleUpload() {
        const doings: StatusItem[] = [];
        try {
            const conn = await this.getConn();
            const name = this.getProjectName();

            const doingDelete = StatusBar.doing('清理工程中');
            if (doingDelete !== undefined) {
                doings.push(doingDelete);
            }
            await this.delete(conn, name);

            const doingUpload = StatusBar.doing('上传工程中');
            if (doingUpload !== undefined) {
                doings.push(doingUpload);
            }
            const workspaceFiles = await this.workspace.getWrokspaceFiles();
            for (const workspaceFile of workspaceFiles) {
                const file = await readFile(workspaceFile.absolutePath);
                await this.upload(conn, workspaceFile.remotePath, file as Uint8Array);
                // TODO(move remotePath to relativePath)
            }

            Output.println('工程已上传');
        } catch (e) {
            Output.eprintln('上传工程失败:', e);
        } finally {
            doings.forEach(it => it.dispose());
        }
    }

    async handleSnapshot() {
        const doing = StatusBar.doing('截图中');
        try {
            if (this.snapshoting) {
                throw new Error('正在尝试屏幕截图中');
            }
            this.snapshoting = true;

            const conn = await this.getConn();
            const file = await this.snapshot(conn);
            const saveDir = await this.asker.askForSnapshotSaveDir();
            const now = Date.now();
            const filename = `Snapshot_${now}.png`;
            const path = join(saveDir, filename);
            await writeFile(path, file);

            Output.println(`屏幕截图已保存至: ${path}`);
        } catch (e) {
            Output.eprintln('屏幕截图失败:', e);
        } finally {
            doing?.dispose();
            this.snapshoting = false;
        }
    }
}
