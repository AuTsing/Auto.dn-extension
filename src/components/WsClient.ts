import { WebSocket } from 'ws';
import { decode as cbor2decode, encode as cbor2encode } from 'cbor2';

export enum Commands {
    Run = 'Run',
    RunResult = 'RunResult',
    Stop = 'Stop',
    StopResult = 'StopResult',
    Delete = 'Delete',
    DeleteResult = 'DeleteResult',
    Upload = 'Upload',
    UploadResult = 'UploadResult',
    Download = 'Download',
    DownloadResult = 'DownloadResult',
    Log = 'Log',
    LogResult = 'LogLogResult',
    Snapshot = 'Snapshot',
    SnapshotResult = 'SnapshotResult',
    SetRunningProjects = 'SetRunningProjects',
    SetRunningProjectsResult = 'SetRunningProjectsResult',
    GetRunningProjects = 'GetRunningProjects',
    GetRunningProjectsResult = 'GetRunningProjectsResult',
}

export enum LogLevel {
    Info = 4,
    Warn = 5,
    Error = 6,
}

interface BaseMessage {
    id: string;
    cmd: Message['cmd'];
    data: Message['data'];
}

export type Message =
    | Run
    | RunResult
    | Stop
    | StopResult
    | Delete
    | DeleteResult
    | Upload
    | UploadResult
    | Download
    | DownloadResult
    | Log
    | LogResult
    | Snapshot
    | SnapshotResult
    | SetRunningProjects
    | SetRunningProjectsResult
    | GetRunningProjects
    | GetRunningProjectsResult;

export interface Run extends BaseMessage {
    cmd: Commands.Run;
    data: { name: string };
}

export interface RunResult extends BaseMessage {
    cmd: Commands.RunResult;
    data: { success: boolean; message: string };
}

export interface Stop extends BaseMessage {
    cmd: Commands.Stop;
    data: { name: string };
}

export interface StopResult extends BaseMessage {
    cmd: Commands.StopResult;
    data: { success: boolean; message: string };
}

export interface Delete extends BaseMessage {
    cmd: Commands.Delete;
    data: { path: string };
}

export interface DeleteResult extends BaseMessage {
    cmd: Commands.DeleteResult;
    data: { success: boolean; message: string };
}

export interface Upload extends BaseMessage {
    cmd: Commands.Upload;
    data: { path: string; file: Uint8Array };
}

export interface UploadResult extends BaseMessage {
    cmd: Commands.UploadResult;
    data: { success: boolean; message: string };
}

export interface Download extends BaseMessage {
    cmd: Commands.Download;
    data: { path: string };
}

export interface DownloadResult extends BaseMessage {
    cmd: Commands.DownloadResult;
    data: { success: boolean; message: string; file: Uint8Array };
}

export interface Log extends BaseMessage {
    cmd: Commands.Log;
    data: { level: LogLevel; message: string };
}

export interface LogResult extends BaseMessage {
    cmd: Commands.LogResult;
    data: { success: boolean; message: string };
}

export interface Snapshot extends BaseMessage {
    cmd: Commands.Snapshot;
    data: {};
}

export interface SnapshotResult extends BaseMessage {
    cmd: Commands.SnapshotResult;
    data: { success: boolean; message: string; file: Uint8Array };
}

export interface SetRunningProjects extends BaseMessage {
    cmd: Commands.SetRunningProjects;
    data: { projects: string[] };
}

export interface SetRunningProjectsResult extends BaseMessage {
    cmd: Commands.SetRunningProjectsResult;
    data: { success: boolean; message: string };
}

export interface GetRunningProjects extends BaseMessage {
    cmd: Commands.GetRunningProjects;
    data: {};
}

export interface GetRunningProjectsResult extends BaseMessage {
    cmd: Commands.GetRunningProjectsResult;
    data: { success: boolean; message: string; projects: string[] };
}

export default class WsClient {
    private readonly deferreds: Map<string, (value: Message) => void>;

    constructor() {
        this.deferreds = new Map();
    }

    encode(data: Message): Uint8Array {
        return cbor2encode(data);
    }

    decode(data: Uint8Array): Message {
        return cbor2decode<Message>(data);
    }

    resolveResult(message: Message) {
        const resolve = this.deferreds.get(message.id);
        if (resolve === undefined) {
            throw new Error(`未就绪的请求消息: ${message.id}`);
        }
        this.deferreds.delete(message.id);
        resolve(message);
    }

    async send(conn: WebSocket, message: Message): Promise<void> {
        const messageBytes = this.encode(message);
        await new Promise<void>((resolve, reject) => {
            conn.send(messageBytes, e => {
                if (e === undefined) {
                    resolve();
                } else {
                    reject(e);
                }
            });
        });
    }

    private async waitForResult(id: string): Promise<Message> {
        return await new Promise<Message>((resolve, _) => {
            this.deferreds.set(id, resolve);
        });
    }

    async run(conn: WebSocket, message: Run): Promise<void> {
        const deferred = this.waitForResult(message.id);
        await this.send(conn, message);
        const runResult = await deferred;
        if (runResult.cmd !== Commands.RunResult) {
            throw Error(`错误的结果: 期望 ${Commands.RunResult} 实际 ${runResult.cmd}`);
        }
        if (runResult.data.success !== true) {
            throw Error(runResult.data.message);
        }
    }

    async stop(conn: WebSocket, message: Stop): Promise<void> {
        const deferred = this.waitForResult(message.id);
        await this.send(conn, message);
        const stopResult = await deferred;
        if (stopResult.cmd !== Commands.StopResult) {
            throw Error(`错误的结果: 期望 ${Commands.StopResult} 实际 ${stopResult.cmd}`);
        }
        if (stopResult.data.success !== true) {
            throw Error(stopResult.data.message);
        }
    }

    async delete(conn: WebSocket, message: Delete): Promise<void> {
        const deferred = this.waitForResult(message.id);
        await this.send(conn, message);
        const deleteResult = await deferred;
        if (deleteResult.cmd !== Commands.DeleteResult) {
            throw Error(`错误的结果: 期望 ${Commands.DeleteResult} 实际 ${deleteResult.cmd}`);
        }
        if (deleteResult.data.success !== true) {
            throw Error(deleteResult.data.message);
        }
    }

    async upload(conn: WebSocket, message: Upload): Promise<void> {
        const deferred = this.waitForResult(message.id);
        await this.send(conn, message);
        const uploadResult = await deferred;
        if (uploadResult.cmd !== Commands.UploadResult) {
            throw Error(`错误的结果: 期望 ${Commands.UploadResult} 实际 ${uploadResult.cmd}`);
        }
        if (uploadResult.data.success !== true) {
            throw Error(uploadResult.data.message);
        }
    }

    async download(conn: WebSocket, message: Download): Promise<Uint8Array> {
        const deferred = this.waitForResult(message.id);
        await this.send(conn, message);
        const downloadResult = await deferred;
        if (downloadResult.cmd !== Commands.DownloadResult) {
            throw Error(`错误的结果: 期望 ${Commands.DownloadResult} 实际 ${downloadResult.cmd}`);
        }
        if (downloadResult.data.success !== true) {
            throw Error(downloadResult.data.message);
        }
        return downloadResult.data.file;
    }

    async log(conn: WebSocket, message: Log): Promise<void> {
        await this.send(conn, message);
    }

    async snapshot(conn: WebSocket, message: Snapshot): Promise<Uint8Array> {
        const deferred = this.waitForResult(message.id);
        await this.send(conn, message);
        const snapshotResult = await deferred;
        if (snapshotResult.cmd !== Commands.SnapshotResult) {
            throw Error(`错误的结果: 期望 ${Commands.SnapshotResult} 实际 ${snapshotResult.cmd}`);
        }
        if (snapshotResult.data.success !== true) {
            throw Error(snapshotResult.data.message);
        }
        return snapshotResult.data.file;
    }

    async getRunningProjects(conn: WebSocket, message: GetRunningProjects): Promise<string[]> {
        const deferred = this.waitForResult(message.id);
        await this.send(conn, message);
        const getRunningProjectsResult = await deferred;
        if (getRunningProjectsResult.cmd !== Commands.GetRunningProjectsResult) {
            throw Error(`错误的结果: 期望 ${Commands.GetRunningProjectsResult} 实际 ${getRunningProjectsResult.cmd}`);
        }
        if (getRunningProjectsResult.data.success !== true) {
            throw Error(getRunningProjectsResult.data.message);
        }
        return getRunningProjectsResult.data.projects;
    }
}
