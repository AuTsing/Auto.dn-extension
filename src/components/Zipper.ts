import { createWriteStream } from 'node:fs';
import { ZipFile } from 'yazl';
import Workspace from './Workspace';
import { println, eprintln } from '../ui/output';
import { dispose, doing, toast } from '../ui/status_bar';

export class Zipper {
    private readonly workspace: Workspace;

    constructor(workspace: Workspace) {
        this.workspace = workspace;
    }

    private async wairForZip(path: string, zip: ZipFile): Promise<void> {
        await new Promise<void>((resolve, reject) => {
            const fws = createWriteStream(path);
            zip.outputStream
                .pipe(fws)
                .on('close', () => resolve())
                .on('error', e => reject(e));
            zip.end();
        });
    }

    async handleZip() {
        const statusItem = doing('打包中');
        try {
            const workspaceFiles = await this.workspace.getWrokspaceFiles();
            const zip = new ZipFile();
            for (const it of workspaceFiles) {
                zip.addFile(it.absPath, it.relPath);
            }
            const workspacePath = this.workspace.getWorkspacePath();
            const path = `${workspacePath}.zip`;
            await this.wairForZip(path, zip);

            println('打包工程成功:', path);
            toast('打包工程成功');
        } catch (e) {
            eprintln('连接设备失败:', e);
        } finally {
            dispose(statusItem.id);
        }
    }
}
