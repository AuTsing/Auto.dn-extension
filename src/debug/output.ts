import { LogOutputChannel, window } from 'vscode';
import { format } from 'util';
import { NAME } from '../data/constant';

const { createOutputChannel } = window;

let channel: LogOutputChannel | undefined;

function getChannel(): LogOutputChannel {
    return (channel ??= createOutputChannel(NAME, { log: true }));
}

export function println(...args: unknown[]) {
    const channel = getChannel();
    const message = format(...args);
    channel.info(message);
}

export function printlnAndShow(...args: unknown[]) {
    const channel = getChannel();
    const message = format(...args);
    channel.info(message);
    channel.show();
}

export function wprintln(...args: unknown[]) {
    const channel = getChannel();
    const message = format(...args);
    channel.warn(message);
}

export function eprintln(...args: unknown[]) {
    const channel = getChannel();
    const message = format(...args);
    channel.error(message);
    channel.show();
}
