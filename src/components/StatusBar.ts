import * as Vscode from 'vscode';
import { eprintln } from '../debug/output';
import { NAME, NS } from '../data/constant';

export class StatusItem {
    prefix: string;
    content: string;
    surfix: string;
    private readonly statusItems: StatusItem[];

    constructor(content: string, statusItems: StatusItem[], prefix: string = '', surfix: string = '') {
        this.content = content;
        this.statusItems = statusItems;
        this.prefix = prefix;
        this.surfix = surfix;
    }

    public display(): string {
        return `${this.prefix} ${this.content} ${this.surfix}`;
    }

    public dispose() {
        const index = this.statusItems.indexOf(this);
        if (index > -1) {
            this.statusItems.splice(index, 1);
        }
    }

    public updateProgress(percent: number) {
        this.prefix = `${Math.round(percent * 100)}%`;
    }
}

export default class StatusBar {
    static instance?: StatusBar;

    static connected(label: string) {
        if (!StatusBar.instance) {
            return;
        }
        const statusItem = new StatusItem(label, StatusBar.instance.statusItems, '🦕', '已连接');
        StatusBar.instance.statusItems.push(statusItem);
    }

    static disconnected(label: string) {
        if (!StatusBar.instance) {
            return;
        }
        const maybeStatusItem = StatusBar.instance.statusItems.find(it => it.content === label);
        maybeStatusItem?.dispose();
        StatusBar.running([]);
    }

    static doing(task: string): StatusItem | undefined {
        if (!StatusBar.instance) {
            return;
        }
        const statusItem = new StatusItem(task, StatusBar.instance.statusItems, '$(loading~spin)', '...');
        StatusBar.instance.statusItems.push(statusItem);
        StatusBar.instance.refresh();
        return statusItem;
    }

    static running(runningProjects: string[]) {
        if (!StatusBar.instance) {
            return;
        }
        if (!StatusBar.instance.runningStatusItem) {
            return;
        }
        if (runningProjects.length === 0) {
            StatusBar.instance.runningStatusItem.dispose();
            return;
        }
        if (runningProjects.length === 1) {
            StatusBar.instance.runningStatusItem.content = runningProjects[0];
        }
        if (runningProjects.length > 1) {
            StatusBar.instance.runningStatusItem.content = `${runningProjects.length} 个工程`;
            StatusBar.instance.refresh();
        }
        if (!StatusBar.instance.statusItems.includes(StatusBar.instance.runningStatusItem)) {
            StatusBar.instance.statusItems.push(StatusBar.instance.runningStatusItem);
            StatusBar.instance.refresh();
        }
    }

    static result(label: string) {
        if (!StatusBar.instance) {
            return;
        }
        const statusItem = new StatusItem(label, StatusBar.instance.statusItems, '✅');
        StatusBar.instance.statusItems.push(statusItem);
        StatusBar.instance.refresh();
        setTimeout(() => statusItem.dispose(), 1500);
    }

    static refresh() {
        if (!StatusBar.instance) {
            return;
        }
        StatusBar.instance.refresh();
    }

    private readonly statusBarItem: Vscode.StatusBarItem;
    private readonly statusItems: StatusItem[];
    private refresher: NodeJS.Timer | null;
    private runningStatusItem: StatusItem | null;

    constructor() {
        this.statusBarItem = Vscode.window.createStatusBarItem(Vscode.StatusBarAlignment.Left);
        this.statusItems = [];
        this.refresher = null;
        this.runningStatusItem = new StatusItem('', this.statusItems, '$(loading~spin)', '运行中');
        const defaultStatusItem = new StatusItem(NAME, this.statusItems, '🦕');
        this.statusItems.push(defaultStatusItem);
        this.statusBarItem.text = defaultStatusItem.display();
        this.statusBarItem.tooltip = NAME;
        this.statusBarItem.command = `${NS}.clickStatusBarItem`;
    }

    private refresh() {
        const statusItem = this.statusItems[this.statusItems.length - 1];
        this.statusBarItem.text = statusItem.display();
        if (this.runningStatusItem && this.statusItems.includes(this.runningStatusItem)) {
            this.statusBarItem.tooltip = '停止工程';
        } else if (this.statusItems.length > 1) {
            this.statusBarItem.tooltip = '断开设备';
        } else {
            this.statusBarItem.tooltip = '连接设备';
        }
    }

    handleShowStatusBar() {
        try {
            this.statusBarItem.show();
            this.refresher = setInterval(() => this.refresh(), 1000);
        } catch (e) {
            eprintln('启用状态栏失败:', e);
        }
    }

    handleHideStatusBar() {
        try {
            this.statusBarItem.hide();
            clearInterval(Number(this.refresher));
            this.refresher = null;
        } catch (e) {
            eprintln('禁用状态栏失败:', e);
        }
    }

    handleClickStatusBarItem() {
        if (this.runningStatusItem && this.statusItems.includes(this.runningStatusItem)) {
            Vscode.commands.executeCommand(`${NS}.stop`);
            return;
        }
        if (this.statusItems.length > 1) {
            Vscode.commands.executeCommand(`${NS}.disconnect`);
            return;
        }
        Vscode.commands.executeCommand(`${NS}.connect`);
    }
}
