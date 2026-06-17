import { randomUUID } from 'node:crypto';
import { window, commands, StatusBarAlignment } from 'vscode';
import { eprintln } from './output';
import { NAME, NS } from '../data/constant';

const { createStatusBarItem } = window;
const { executeCommand } = commands;

export class StatusItem {
    readonly id: string;
    content: string;
    prefix: string;
    suffix: string;

    constructor(content: string, prefix: string = '', suffix: string = '') {
        this.id = randomUUID();
        this.content = content;
        this.prefix = prefix;
        this.suffix = suffix;
    }

    display(): string {
        return `${this.prefix} ${this.content} ${this.suffix}`;
    }

    updateProgress(percent: number) {
        this.prefix = `${Math.round(percent * 100)}%`;
    }
}

const statusBarItem = createStatusBarItem(StatusBarAlignment.Left);
const doingStatusItems: StatusItem[] = [];
let runningStatusItem: StatusItem | null = null;
let connectedStatusItem: StatusItem | null = null;
const defaultStatusItem: StatusItem = new StatusItem(NAME, '🦕');

statusBarItem.text = defaultStatusItem.display();
statusBarItem.tooltip = NAME;
statusBarItem.command = `${NS}.clickStatusBarItem`;

export function dispose(id: string) {
    const index = doingStatusItems.findIndex(it => it.id === id);
    if (index > -1) {
        doingStatusItems.splice(index, 1);
    }

    if (runningStatusItem?.id === id) {
        runningStatusItem = null;
    }

    if (connectedStatusItem?.id === id) {
        connectedStatusItem = null;
    }

    refresh();
}

export function doing(task: string): StatusItem {
    const statusItem = new StatusItem(task, '$(loading~spin)', '...');
    doingStatusItems.push(statusItem);
    refresh();

    return statusItem;
}

export function toast(label: string) {
    const statusItem = new StatusItem(label, '✅');
    doingStatusItems.push(statusItem);
    refresh();
    setTimeout(() => dispose(statusItem.id), 1500);
}

export function running(runningProjects: string[]) {
    if (runningProjects.length <= 0) {
        runningStatusItem = null;
        refresh();
        return;
    }
    if (runningStatusItem === null) {
        runningStatusItem = new StatusItem('', '$(loading~spin)', '运行中');
    }
    if (runningProjects.length === 1) {
        runningStatusItem.content = runningProjects[0];
    }
    if (runningProjects.length > 1) {
        runningStatusItem.content = `${runningProjects.length} 个工程`;
    }
    refresh();
}

export function connected(label: string) {
    connectedStatusItem = new StatusItem(label, '🦕', '已连接');
    refresh();
}

export function disconnect() {
    connectedStatusItem = null;
    runningStatusItem = null;
    doingStatusItems.length = 0;
    refresh();
}

function refresh() {
    let statusItem: StatusItem;
    if (doingStatusItems.length > 0) {
        statusItem = doingStatusItems.at(-1) ?? defaultStatusItem;
    } else if (runningStatusItem !== null) {
        statusItem = runningStatusItem;
    } else if (connectedStatusItem !== null) {
        statusItem = connectedStatusItem;
    } else {
        statusItem = defaultStatusItem;
    }
    statusBarItem.text = statusItem.display();

    if (statusItem === runningStatusItem) {
        statusBarItem.tooltip = '停止工程';
    } else if (statusItem === connectedStatusItem) {
        statusBarItem.tooltip = '断开设备';
    } else {
        statusBarItem.tooltip = '连接设备';
    }
}

export function handleShowStatusBar() {
    try {
        statusBarItem.show();
    } catch (e) {
        eprintln('启用状态栏失败:', e);
    }
}

export function handleHideStatusBar() {
    try {
        statusBarItem.hide();
    } catch (e) {
        eprintln('禁用状态栏失败:', e);
    }
}

export function handleClickStatusBarItem() {
    if (runningStatusItem !== null) {
        executeCommand(`${NS}.stop`);
        return;
    }
    if (connectedStatusItem !== null) {
        executeCommand(`${NS}.disconnect`);
        return;
    }
    executeCommand(`${NS}.connect`);
}
