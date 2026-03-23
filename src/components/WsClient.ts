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

type Cbor =
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

type TaggedCbor = [number, [Cbor[0], Map<string, any>]];

interface WsMessage {
    readonly id: string;
    readonly data: WsMessageData;
    toCBOR(): TaggedCbor;
}

export class Run implements WsMessage {
    static readonly cmd: WsMessageCmd.Run = WsMessageCmd.Run;

    readonly id: string;
    readonly data: RunData;

    constructor(id: string, data: RunData) {
        this.id = id;
        this.data = data;
    }

    toCBOR(): TaggedCbor {
        return [NaN, [Run.cmd, new Map(Object.entries(this))]];
    }
}

export class RunResult implements WsMessage {
    static readonly cmd: WsMessageCmd = WsMessageCmd.RunResult;

    readonly id: string;
    readonly data: RunResultData;

    constructor(id: string, data: RunResultData) {
        this.id = id;
        this.data = data;
    }

    toCBOR(): TaggedCbor {
        return [NaN, [RunResult.cmd, new Map(Object.entries(this))]];
    }
}

export class Stop implements WsMessage {
    static readonly cmd: WsMessageCmd = WsMessageCmd.Stop;

    readonly id: string;
    readonly data: StopData;

    constructor(id: string, data: StopData) {
        this.id = id;
        this.data = data;
    }

    toCBOR(): TaggedCbor {
        return [NaN, [Stop.cmd, new Map(Object.entries(this))]];
    }
}

export class StopResult implements WsMessage {
    static readonly cmd: WsMessageCmd = WsMessageCmd.StopResult;

    readonly id: string;
    readonly data: StopResultData;

    constructor(id: string, data: StopResultData) {
        this.id = id;
        this.data = data;
    }

    toCBOR(): TaggedCbor {
        return [NaN, [StopResult.cmd, new Map(Object.entries(this))]];
    }
}

export class Delete implements WsMessage {
    static readonly cmd: WsMessageCmd = WsMessageCmd.Delete;

    readonly id: string;
    readonly data: DeleteData;

    constructor(id: string, data: DeleteData) {
        this.id = id;
        this.data = data;
    }

    toCBOR(): TaggedCbor {
        return [NaN, [Delete.cmd, new Map(Object.entries(this))]];
    }
}

export class DeleteResult implements WsMessage {
    static readonly cmd: WsMessageCmd = WsMessageCmd.DeleteResult;

    readonly id: string;
    readonly data: DeleteResultData;

    constructor(id: string, data: DeleteResultData) {
        this.id = id;
        this.data = data;
    }

    toCBOR(): TaggedCbor {
        return [NaN, [DeleteResult.cmd, new Map(Object.entries(this))]];
    }
}

export class Upload implements WsMessage {
    static readonly cmd: WsMessageCmd = WsMessageCmd.Upload;

    readonly id: string;
    readonly data: UploadData;

    constructor(id: string, data: UploadData) {
        this.id = id;
        this.data = data;
    }

    toCBOR(): TaggedCbor {
        return [NaN, [Upload.cmd, new Map(Object.entries(this))]];
    }
}

export class UploadResult implements WsMessage {
    static readonly cmd: WsMessageCmd = WsMessageCmd.UploadResult;

    readonly id: string;
    readonly data: UploadResultData;

    constructor(id: string, data: UploadResultData) {
        this.id = id;
        this.data = data;
    }

    toCBOR(): TaggedCbor {
        return [NaN, [UploadResult.cmd, new Map(Object.entries(this))]];
    }
}

export class Download implements WsMessage {
    static readonly cmd: WsMessageCmd = WsMessageCmd.Download;

    readonly id: string;
    readonly data: DownloadData;

    constructor(id: string, data: DownloadData) {
        this.id = id;
        this.data = data;
    }

    toCBOR(): TaggedCbor {
        return [NaN, [Download.cmd, new Map(Object.entries(this))]];
    }
}

export class DownloadResult implements WsMessage {
    static readonly cmd: WsMessageCmd = WsMessageCmd.DownloadResult;

    readonly id: string;
    readonly data: DownloadResultData;

    constructor(id: string, data: DownloadResultData) {
        this.id = id;
        this.data = data;
    }

    toCBOR(): TaggedCbor {
        return [NaN, [DownloadResult.cmd, new Map(Object.entries(this))]];
    }
}

export class Log implements WsMessage {
    static readonly cmd: WsMessageCmd = WsMessageCmd.Log;

    readonly id: string;
    readonly data: LogData;

    constructor(id: string, data: LogData) {
        this.id = id;
        this.data = data;
    }

    toCBOR(): TaggedCbor {
        return [NaN, [Log.cmd, new Map(Object.entries(this))]];
    }
}

export class LogResult implements WsMessage {
    static readonly cmd: WsMessageCmd = WsMessageCmd.LogResult;

    readonly id: string;
    readonly data: LogResultData;

    constructor(id: string, data: LogResultData) {
        this.id = id;
        this.data = data;
    }

    toCBOR(): TaggedCbor {
        return [NaN, [LogResult.cmd, new Map(Object.entries(this))]];
    }
}

export class Snapshot implements WsMessage {
    static readonly cmd: WsMessageCmd = WsMessageCmd.Snapshot;

    readonly id: string;
    readonly data: SnapshotData;

    constructor(id: string, data: SnapshotData) {
        this.id = id;
        this.data = data;
    }

    toCBOR(): TaggedCbor {
        return [NaN, [Snapshot.cmd, new Map(Object.entries(this))]];
    }
}

export class SnapshotResult implements WsMessage {
    static readonly cmd: WsMessageCmd = WsMessageCmd.SnapshotResult;

    readonly id: string;
    readonly data: SnapshotResultData;

    constructor(id: string, data: SnapshotResultData) {
        this.id = id;
        this.data = data;
    }

    toCBOR(): TaggedCbor {
        return [NaN, [SnapshotResult.cmd, new Map(Object.entries(this))]];
    }
}

export class SetRunningProjects implements WsMessage {
    static readonly cmd: WsMessageCmd = WsMessageCmd.SetRunningProjects;

    readonly id: string;
    readonly data: SetRunningProjectsData;

    constructor(id: string, data: SetRunningProjectsData) {
        this.id = id;
        this.data = data;
    }

    toCBOR(): TaggedCbor {
        return [NaN, [SetRunningProjects.cmd, new Map(Object.entries(this))]];
    }
}

export class SetRunningProjectsResult implements WsMessage {
    static readonly cmd: WsMessageCmd = WsMessageCmd.SetRunningProjectsResult;

    readonly id: string;
    readonly data: SetRunningProjectsResultData;

    constructor(id: string, data: SetRunningProjectsResultData) {
        this.id = id;
        this.data = data;
    }

    toCBOR(): TaggedCbor {
        return [NaN, [SetRunningProjectsResult.cmd, new Map(Object.entries(this))]];
    }
}

export class GetRunningProjects implements WsMessage {
    static readonly cmd: WsMessageCmd = WsMessageCmd.GetRunningProjects;

    readonly id: string;
    readonly data: GetRunningProjectsData;

    constructor(id: string, data: GetRunningProjectsData) {
        this.id = id;
        this.data = data;
    }

    toCBOR(): TaggedCbor {
        return [NaN, [GetRunningProjects.cmd, new Map(Object.entries(this))]];
    }
}

export class GetRunningProjectsResult implements WsMessage {
    static readonly cmd: WsMessageCmd = WsMessageCmd.GetRunningProjectsResult;

    readonly id: string;
    readonly data: GetRunningProjectsResultData;

    constructor(id: string, data: GetRunningProjectsResultData) {
        this.id = id;
        this.data = data;
    }

    toCBOR(): TaggedCbor {
        return [NaN, [GetRunningProjectsResult.cmd, new Map(Object.entries(this))]];
    }
}

export default class WsClient {
    static {
        registerEncoder(Buffer, it => [NaN, new Uint8Array(it.buffer, it.byteOffset, it.byteLength)]);
    }

    private readonly deferreds: Map<string, (value: WsMessage) => void>;

    constructor() {
        this.deferreds = new Map();
    }

    encode(data: WsMessage): Uint8Array {
        const message = cbor2encode(data);
        return message;
    }

    decode(data: Uint8Array): WsMessage {
        const cbor = cbor2decode<Cbor>(data);
        let message: WsMessage;
        switch (cbor[0]) {
            case WsMessageCmd.Run:
                message = new Run(cbor[1].id, cbor[1].data);
                break;
            case WsMessageCmd.RunResult:
                message = new RunResult(cbor[1].id, cbor[1].data);
                break;
            case WsMessageCmd.Stop:
                message = new Stop(cbor[1].id, cbor[1].data);
                break;
            case WsMessageCmd.StopResult:
                message = new StopResult(cbor[1].id, cbor[1].data);
                break;
            case WsMessageCmd.Delete:
                message = new Delete(cbor[1].id, cbor[1].data);
                break;
            case WsMessageCmd.DeleteResult:
                message = new DeleteResult(cbor[1].id, cbor[1].data);
                break;
            case WsMessageCmd.Upload:
                message = new Upload(cbor[1].id, cbor[1].data);
                break;
            case WsMessageCmd.UploadResult:
                message = new UploadResult(cbor[1].id, cbor[1].data);
                break;
            case WsMessageCmd.Download:
                message = new Download(cbor[1].id, cbor[1].data);
                break;
            case WsMessageCmd.DownloadResult:
                message = new DownloadResult(cbor[1].id, cbor[1].data);
                break;
            case WsMessageCmd.Log:
                message = new Log(cbor[1].id, cbor[1].data);
                break;
            case WsMessageCmd.LogResult:
                message = new LogResult(cbor[1].id, cbor[1].data);
                break;
            case WsMessageCmd.Snapshot:
                message = new Snapshot(cbor[1].id, cbor[1].data);
                break;
            case WsMessageCmd.SnapshotResult:
                message = new SnapshotResult(cbor[1].id, cbor[1].data);
                break;
            case WsMessageCmd.SetRunningProjects:
                message = new SetRunningProjects(cbor[1].id, cbor[1].data);
                break;
            case WsMessageCmd.SetRunningProjectsResult:
                message = new SetRunningProjectsResult(cbor[1].id, cbor[1].data);
                break;
            case WsMessageCmd.GetRunningProjects:
                message = new GetRunningProjects(cbor[1].id, cbor[1].data);
                break;
            case WsMessageCmd.GetRunningProjectsResult:
                message = new GetRunningProjectsResult(cbor[1].id, cbor[1].data);
                break;
            default:
                throw Error(`未知类型: ${cbor}`);
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
            throw Error(`错误的结果: 期望 RunResult 实际 ${runResult}`);
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
            throw Error(`错误的结果: 期望 StopResult 实际 ${stopResult}`);
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
            throw Error(`错误的结果: 期望 DeleteResult 实际 ${deleteResult}`);
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
            throw Error(`错误的结果: 期望 UploadResult 实际 ${uploadResult}`);
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
            throw Error(`错误的结果: 期望 DownloadResult 实际 ${downloadResult}`);
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
            throw Error(`错误的结果: 期望 SnapshotResult 实际 ${snapshotResult}`);
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
            throw Error(`错误的结果: 期望 GetRunningProjectsResult 实际 ${getRunningProjectsResult}`);
        }
        if (getRunningProjectsResult.data.success !== true) {
            throw Error(getRunningProjectsResult.data.message);
        }
        return getRunningProjectsResult.data.projects;
    }
}
