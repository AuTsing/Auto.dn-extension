import { format } from 'node:util';
import { window } from 'vscode';
import { NAME } from '../data/constant';

const { createOutputChannel } = window;

const channel = createOutputChannel(NAME, { log: true });

export function println(...args: unknown[]) {
    const message = format(...args);
    channel.info(message);
}

export function printlnAndShow(...args: unknown[]) {
    const message = format(...args);
    channel.info(message);
    channel.show();
}

export function wprintln(...args: unknown[]) {
    const message = format(...args);
    channel.warn(message);
}

export function eprintln(...args: unknown[]) {
    const message = format(...args);
    channel.error(message);
    channel.show();
}
