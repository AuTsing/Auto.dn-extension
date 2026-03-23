import { WebSocket } from 'ws';
import { decode as cbor2decode, encode as cbor2encode } from 'cbor2';
import { registerEncoder } from 'cbor2/encoder';

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
    Info = 'Info',
    Warn = 'Warn',
    Error = 'Error',
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

abstract class WsMessage {
    abstract readonly id: string;
    abstract readonly data: WsMessageData;
    abstract readonly cmd: WsMessageCmd;

    toCBOR() {
        return [NaN, [this.cmd, new Map(Object.entries(this))]];
    }
}

export class Run extends WsMessage {
    readonly id: string;
    readonly data: RunData;
    readonly cmd: WsMessageCmd = WsMessageCmd.Run;

    constructor(id: string, data: RunData) {
        super();
        this.id = id;
        this.data = data;
    }
}

export class RunResult extends WsMessage {
    readonly id: string;
    readonly data: RunResultData;
    readonly cmd: WsMessageCmd = WsMessageCmd.RunResult;

    constructor(id: string, data: RunResultData) {
        super();
        this.id = id;
        this.data = data;
    }
}

export class Stop extends WsMessage {
    readonly id: string;
    readonly data: StopData;
    readonly cmd: WsMessageCmd = WsMessageCmd.Stop;

    constructor(id: string, data: StopData) {
        super();
        this.id = id;
        this.data = data;
    }
}

export class StopResult extends WsMessage {
    readonly id: string;
    readonly data: StopResultData;
    readonly cmd: WsMessageCmd = WsMessageCmd.StopResult;

    constructor(id: string, data: StopResultData) {
        super();
        this.id = id;
        this.data = data;
    }
}

export class Delete extends WsMessage {
    readonly id: string;
    readonly data: DeleteData;
    readonly cmd: WsMessageCmd = WsMessageCmd.Delete;

    constructor(id: string, data: DeleteData) {
        super();
        this.id = id;
        this.data = data;
    }
}

export class DeleteResult extends WsMessage {
    readonly id: string;
    readonly data: DeleteResultData;
    readonly cmd: WsMessageCmd = WsMessageCmd.DeleteResult;

    constructor(id: string, data: DeleteResultData) {
        super();
        this.id = id;
        this.data = data;
    }
}

export class Upload extends WsMessage {
    readonly id: string;
    readonly data: UploadData;
    readonly cmd: WsMessageCmd = WsMessageCmd.Upload;

    constructor(id: string, data: UploadData) {
        super();
        this.id = id;
        this.data = data;
    }
}

export class UploadResult extends WsMessage {
    readonly id: string;
    readonly data: UploadResultData;
    readonly cmd: WsMessageCmd = WsMessageCmd.UploadResult;

    constructor(id: string, data: UploadResultData) {
        super();
        this.id = id;
        this.data = data;
    }
}

export class Download extends WsMessage {
    readonly id: string;
    readonly data: DownloadData;
    readonly cmd: WsMessageCmd = WsMessageCmd.Upload;

    constructor(id: string, data: DownloadData) {
        super();
        this.id = id;
        this.data = data;
    }
}

export class DownloadResult extends WsMessage {
    readonly id: string;
    readonly data: DownloadResultData;
    readonly cmd: WsMessageCmd = WsMessageCmd.DownloadResult;

    constructor(id: string, data: DownloadResultData) {
        super();
        this.id = id;
        this.data = data;
    }
}

export class Log extends WsMessage {
    readonly id: string;
    readonly data: LogData;
    readonly cmd: WsMessageCmd = WsMessageCmd.Log;

    constructor(id: string, data: LogData) {
        super();
        this.id = id;
        this.data = data;
    }
}

export class LogResult extends WsMessage {
    readonly id: string;
    readonly data: LogResultData;
    readonly cmd: WsMessageCmd = WsMessageCmd.LogResult;

    constructor(id: string, data: LogResultData) {
        super();
        this.id = id;
        this.data = data;
    }
}

export class Snapshot extends WsMessage {
    readonly id: string;
    readonly data: SnapshotData;
    readonly cmd: WsMessageCmd = WsMessageCmd.Snapshot;

    constructor(id: string, data: SnapshotData) {
        super();
        this.id = id;
        this.data = data;
    }
}

export class SnapshotResult extends WsMessage {
    readonly id: string;
    readonly data: SnapshotResultData;
    readonly cmd: WsMessageCmd = WsMessageCmd.SnapshotResult;

    constructor(id: string, data: SnapshotResultData) {
        super();
        this.id = id;
        this.data = data;
    }
}

export class SetRunningProjects extends WsMessage {
    readonly id: string;
    readonly data: SetRunningProjectsData;
    readonly cmd: WsMessageCmd = WsMessageCmd.SetRunningProjects;

    constructor(id: string, data: SetRunningProjectsData) {
        super();
        this.id = id;
        this.data = data;
    }
}

export class SetRunningProjectsResult extends WsMessage {
    readonly id: string;
    readonly data: SetRunningProjectsResultData;
    readonly cmd: WsMessageCmd = WsMessageCmd.SetRunningProjectsResult;

    constructor(id: string, data: SetRunningProjectsResultData) {
        super();
        this.id = id;
        this.data = data;
    }
}

export class GetRunningProjects extends WsMessage {
    readonly id: string;
    readonly data: GetRunningProjectsData;
    readonly cmd: WsMessageCmd = WsMessageCmd.GetRunningProjects;

    constructor(id: string, data: GetRunningProjectsData) {
        super();
        this.id = id;
        this.data = data;
    }
}

export class GetRunningProjectsResult extends WsMessage {
    readonly id: string;
    readonly data: GetRunningProjectsResultData;
    readonly cmd: WsMessageCmd = WsMessageCmd.GetRunningProjectsResult;

    constructor(id: string, data: GetRunningProjectsResultData) {
        super();
        this.id = id;
        this.data = data;
    }
}

export default class WsClient {
    static {
        registerEncoder(Buffer, b => [NaN, [...b]]);
    }

    private readonly deferreds: Map<string, (value: WsMessage) => void>;

    constructor() {
        this.deferreds = new Map();
    }

    encode(data: WsMessage): Uint8Array {
        console.log('encode:', data);
        const message = cbor2encode(data);
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
