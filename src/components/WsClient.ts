import { WebSocket } from 'ws';
import { decode as cbor2decode, encode as cbor2encode } from 'cbor2';

export enum WsMessageCmd {
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

type RawWsMessage =
    | [WsMessageCmd.Run, Run]
    | [WsMessageCmd.RunResult, RunResult]
    | [WsMessageCmd.Stop, Stop]
    | [WsMessageCmd.StopResult, StopResult]
    | [WsMessageCmd.Delete, Delete]
    | [WsMessageCmd.DeleteResult, DeleteResult]
    | [WsMessageCmd.Upload, Upload]
    | [WsMessageCmd.UploadResult, UploadResult]
    | [WsMessageCmd.Download, Download]
    | [WsMessageCmd.DownloadResult, DownloadResult]
    | [WsMessageCmd.Log, Log]
    | [WsMessageCmd.LogResult, LogResult]
    | [WsMessageCmd.Snapshot, Snapshot]
    | [WsMessageCmd.SnapshotResult, SnapshotResult]
    | [WsMessageCmd.SetRunningProjects, SetRunningProjects]
    | [WsMessageCmd.SetRunningProjectsResult, SetRunningProjectsResult]
    | [WsMessageCmd.GetRunningProjects, GetRunningProjects]
    | [WsMessageCmd.GetRunningProjectsResult, GetRunningProjectsResult];

type WsMessageData =
    | RunData
    | RunResultData
    | StopData
    | StopResultData
    | DeleteData
    | DeleteResultData
    | UploadData
    | UploadResultData
    | DownloadData
    | DownloadResultData
    | LogData
    | LogResultData
    | SnapshotData
    | SnapshotResultData
    | SetRunningProjectsData
    | SetRunningProjectsResultData
    | GetRunningProjectsData
    | GetRunningProjectsResultData;

interface RunData {
    readonly name: string;
}

interface RunResultData {
    readonly success: boolean;
    readonly message: string;
}

interface StopData {
    readonly name: string;
}

interface StopResultData {
    readonly success: boolean;
    readonly message: string;
}

interface DeleteData {
    readonly path: string;
}

interface DeleteResultData {
    readonly success: boolean;
    readonly message: string;
}

interface UploadData {
    readonly path: string;
    readonly file: Uint8Array;
}

interface UploadResultData {
    readonly success: boolean;
    readonly message: string;
}

interface DownloadData {
    readonly path: string;
}

interface DownloadResultData {
    readonly success: boolean;
    readonly message: string;
    readonly file: Uint8Array;
}

interface LogData {
    readonly level: LogLevel;
    readonly message: string;
}

interface LogResultData {
    readonly success: boolean;
    readonly message: string;
}

interface SnapshotData {}

interface SnapshotResultData {
    readonly success: boolean;
    readonly message: string;
    readonly file: Uint8Array;
}

interface SetRunningProjectsData {
    readonly projects: string[];
}

interface SetRunningProjectsResultData {
    readonly success: boolean;
    readonly message: string;
}

interface GetRunningProjectsData {}

interface GetRunningProjectsResultData {
    readonly success: boolean;
    readonly message: string;
    readonly projects: string[];
}

interface WsMessage {
    readonly id: string;
    readonly data: WsMessageData;
}

export class Run implements WsMessage {
    constructor(
        public id: string,
        public data: RunData,
    ) {}
}

export class RunResult implements WsMessage {
    constructor(
        public id: string,
        public data: RunResultData,
    ) {}
}

export class Stop implements WsMessage {
    constructor(
        public id: string,
        public data: StopData,
    ) {}
}

export class StopResult implements WsMessage {
    constructor(
        public id: string,
        public data: StopResultData,
    ) {}
}

export class Delete implements WsMessage {
    constructor(
        public id: string,
        public data: DeleteData,
    ) {}
}

export class DeleteResult implements WsMessage {
    constructor(
        public id: string,
        public data: DeleteResultData,
    ) {}
}

export class Upload implements WsMessage {
    constructor(
        public id: string,
        public data: UploadData,
    ) {}
}

export class UploadResult implements WsMessage {
    constructor(
        public id: string,
        public data: UploadResultData,
    ) {}
}

export class Download implements WsMessage {
    constructor(
        public id: string,
        public data: DownloadData,
    ) {}
}

export class DownloadResult implements WsMessage {
    constructor(
        public id: string,
        public data: DownloadResultData,
    ) {}
}

export class Log implements WsMessage {
    constructor(
        public id: string,
        public data: LogData,
    ) {}
}

export class LogResult implements WsMessage {
    constructor(
        public id: string,
        public data: LogResultData,
    ) {}
}

export class Snapshot implements WsMessage {
    constructor(
        public id: string,
        public data: SnapshotData,
    ) {}
}

export class SnapshotResult implements WsMessage {
    constructor(
        public id: string,
        public data: SnapshotResultData,
    ) {}
}

export class SetRunningProjects implements WsMessage {
    constructor(
        public id: string,
        public data: SetRunningProjectsData,
    ) {}
}

export class SetRunningProjectsResult implements WsMessage {
    constructor(
        public id: string,
        public data: SetRunningProjectsResultData,
    ) {}
}

export class GetRunningProjects implements WsMessage {
    constructor(
        public id: string,
        public data: GetRunningProjectsData,
    ) {}
}

export class GetRunningProjectsResult implements WsMessage {
    constructor(
        public id: string,
        public data: GetRunningProjectsResultData,
    ) {}
}

export default class WsClient {
    private readonly deferreds: Map<string, (value: WsMessage) => void>;

    constructor() {
        this.deferreds = new Map();
    }

    encode(data: WsMessage): Uint8Array {
        console.log('encode:', data);

        let raw: RawWsMessage | undefined = undefined;
        switch (true) {
            case data instanceof Run:
                break;
            case data instanceof Run:
                raw = [WsMessageCmd.Run, data];
                break;
            case data instanceof RunResult:
                raw = [WsMessageCmd.RunResult, data];
                break;
            case data instanceof Stop:
                raw = [WsMessageCmd.Stop, data];
                break;
            case data instanceof StopResult:
                raw = [WsMessageCmd.StopResult, data];
                break;
            case data instanceof Delete:
                raw = [WsMessageCmd.Delete, data];
                break;
            case data instanceof DeleteResult:
                raw = [WsMessageCmd.DeleteResult, data];
                break;
            case data instanceof Upload:
                raw = [WsMessageCmd.Upload, data];
                break;
            case data instanceof UploadResult:
                raw = [WsMessageCmd.UploadResult, data];
                break;
            case data instanceof Download:
                raw = [WsMessageCmd.Download, data];
                break;
            case data instanceof DownloadResult:
                raw = [WsMessageCmd.DownloadResult, data];
                break;
            case data instanceof Log:
                raw = [WsMessageCmd.Log, data];
                break;
            case data instanceof LogResult:
                raw = [WsMessageCmd.LogResult, data];
                break;
            case data instanceof Snapshot:
                raw = [WsMessageCmd.Snapshot, data];
                break;
            case data instanceof SnapshotResult:
                raw = [WsMessageCmd.SnapshotResult, data];
                break;
            case data instanceof SetRunningProjects:
                raw = [WsMessageCmd.SetRunningProjects, data];
                break;
            case data instanceof SetRunningProjectsResult:
                raw = [WsMessageCmd.SetRunningProjectsResult, data];
                break;
            case data instanceof GetRunningProjects:
                raw = [WsMessageCmd.GetRunningProjects, data];
                break;
            case data instanceof GetRunningProjectsResult:
                raw = [WsMessageCmd.GetRunningProjectsResult, data];
                break;
        }
        if (raw === undefined) {
            throw Error(`未知类型: ${data}`);
        }
        const message = cbor2encode(raw);

        console.log(
            'encoded:',
            [...message]
                .map(b => b.toString(16).padStart(2, '0'))
                .join(' ')
                .toUpperCase(),
        );

        return message;
    }

    decode(data: Uint8Array): WsMessage {
        const raw = cbor2decode<RawWsMessage>(data);

        console.log('decode:', raw);
        let message: WsMessage | undefined = undefined;
        switch (raw[0]) {
            case WsMessageCmd.Run:
                message = new Run(raw[1].id, raw[1].data);
                break;
            case WsMessageCmd.RunResult:
                message = new RunResult(raw[1].id, raw[1].data);
                break;
            case WsMessageCmd.Stop:
                message = new Stop(raw[1].id, raw[1].data);
                break;
            case WsMessageCmd.StopResult:
                message = new StopResult(raw[1].id, raw[1].data);
                break;
            case WsMessageCmd.Delete:
                message = new Delete(raw[1].id, raw[1].data);
                break;
            case WsMessageCmd.DeleteResult:
                message = new DeleteResult(raw[1].id, raw[1].data);
                break;
            case WsMessageCmd.Upload:
                message = new Upload(raw[1].id, raw[1].data);
                break;
            case WsMessageCmd.UploadResult:
                message = new UploadResult(raw[1].id, raw[1].data);
                break;
            case WsMessageCmd.Download:
                message = new Download(raw[1].id, raw[1].data);
                break;
            case WsMessageCmd.DownloadResult:
                message = new DownloadResult(raw[1].id, raw[1].data);
                break;
            case WsMessageCmd.Log:
                message = new Log(raw[1].id, raw[1].data);
                break;
            case WsMessageCmd.LogResult:
                message = new LogResult(raw[1].id, raw[1].data);
                break;
            case WsMessageCmd.Snapshot:
                message = new Snapshot(raw[1].id, raw[1].data);
                break;
            case WsMessageCmd.SnapshotResult:
                message = new SnapshotResult(raw[1].id, raw[1].data);
                break;
            case WsMessageCmd.SetRunningProjects:
                message = new SetRunningProjects(raw[1].id, raw[1].data);
                break;
            case WsMessageCmd.SetRunningProjectsResult:
                message = new SetRunningProjectsResult(raw[1].id, raw[1].data);
                break;
            case WsMessageCmd.GetRunningProjects:
                message = new GetRunningProjects(raw[1].id, raw[1].data);
                break;
            case WsMessageCmd.GetRunningProjectsResult:
                message = new GetRunningProjectsResult(raw[1].id, raw[1].data);
                break;
        }
        if (message === undefined) {
            throw Error(`未知类型: ${raw}`);
        }
        return message;
    }

    resolveResult(message: WsMessage) {
        const resolve = this.deferreds.get(message.id);
        if (resolve === undefined) {
            throw new Error(`未就绪的请求消息: ${message.id}`);
        }
        this.deferreds.delete(message.id);
        resolve(message);
    }

    async send(conn: WebSocket, message: WsMessage): Promise<void> {
        const messageBytes = this.encode(message);
        await new Promise<void>((resolve, reject) => {
            conn.send(messageBytes, e => {
                if (e === undefined || e === null) {
                    resolve();
                } else {
                    reject(e);
                }
            });
        });
    }

    private async waitForResult(id: string): Promise<WsMessage> {
        return await new Promise<WsMessage>((resolve, _) => {
            this.deferreds.set(id, resolve);
        });
    }

    async run(conn: WebSocket, message: Run): Promise<void> {
        const deferred = this.waitForResult(message.id);
        await this.send(conn, message);
        const runResult = await deferred;
        if (runResult instanceof RunResult !== true) {
            throw Error(`错误的结果: 期望 ${WsMessageCmd.RunResult} 实际 ${runResult}`);
        }
        if (runResult.data.success !== true) {
            throw Error(runResult.data.message);
        }
    }

    async stop(conn: WebSocket, message: Stop): Promise<void> {
        const deferred = this.waitForResult(message.id);
        await this.send(conn, message);
        const stopResult = await deferred;
        if (stopResult instanceof StopResult !== true) {
            throw Error(`错误的结果: 期望 ${WsMessageCmd.StopResult} 实际 ${stopResult}`);
        }
        if (stopResult.data.success !== true) {
            throw Error(stopResult.data.message);
        }
    }

    async delete(conn: WebSocket, message: Delete): Promise<void> {
        const deferred = this.waitForResult(message.id);
        await this.send(conn, message);
        const deleteResult = await deferred;
        if (deleteResult instanceof DeleteResult !== true) {
            throw Error(`错误的结果: 期望 ${WsMessageCmd.DeleteResult} 实际 ${deleteResult}`);
        }
        if (deleteResult.data.success !== true) {
            throw Error(deleteResult.data.message);
        }
    }

    async upload(conn: WebSocket, message: Upload): Promise<void> {
        const deferred = this.waitForResult(message.id);
        await this.send(conn, message);
        const uploadResult = await deferred;
        if (uploadResult instanceof UploadResult !== true) {
            throw Error(`错误的结果: 期望 ${WsMessageCmd.UploadResult} 实际 ${uploadResult}`);
        }
        if (uploadResult.data.success !== true) {
            throw Error(uploadResult.data.message);
        }
    }

    async download(conn: WebSocket, message: Download): Promise<Uint8Array> {
        const deferred = this.waitForResult(message.id);
        await this.send(conn, message);
        const downloadResult = await deferred;
        if (downloadResult instanceof DownloadResult !== true) {
            throw Error(`错误的结果: 期望 ${WsMessageCmd.DownloadResult} 实际 ${downloadResult}`);
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
        if (snapshotResult instanceof SnapshotResult !== true) {
            throw Error(`错误的结果: 期望 ${WsMessageCmd.SnapshotResult} 实际 ${snapshotResult}`);
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
        if (getRunningProjectsResult instanceof GetRunningProjectsResult !== true) {
            throw Error(`错误的结果: 期望 ${WsMessageCmd.GetRunningProjectsResult} 实际 ${getRunningProjectsResult}`);
        }
        if (getRunningProjectsResult.data.success !== true) {
            throw Error(getRunningProjectsResult.data.message);
        }
        return getRunningProjectsResult.data.projects;
    }
}
