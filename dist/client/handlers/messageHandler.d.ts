import { Message, PermissionResolvable } from 'discord.js';
import { Command, CommandTypes } from "../commands/command";
import { Plugin } from "../plugins/plugin";
import { Response } from "../util/response";
export interface MessageSender {
    id: string;
    guildOwner: boolean;
    globalAdmin: boolean;
}
export interface MessageContext {
    args: string[];
    supportedEnvironment: boolean;
    requiredEnvironments: CommandTypes.CommandEnvironments;
    /**
     * The missing permissions for this command (whether the bot or the sender is missing them)
     */
    missingPermissions: PermissionResolvable[];
    response: Response;
    plugin?: Plugin;
    hasPermission(): Promise<boolean>;
}
export interface MessageEvent {
    message: Message;
    command: Command;
    sender: MessageSender;
    context: MessageContext;
}
export declare type MessageMiddleware = (event: MessageEvent, next: () => void) => void;
export interface MessageHandler {
    middleware: MessageMiddleware[];
    /**
     * Handles a message
     *
     * @param {Message} message The message to handle
     * @returns {Promise<void>}
     * @memberof MessageListener
     */
    handle(message: Message): Promise<void>;
    /**
     * Adds a function to the middleware flow
     *
     * @param {MessageMiddleware} middleware The middlware to use
     * @returns {number} the index of this middleware
     * @memberof MessageListener
     */
    use(middleware: MessageMiddleware): number;
}
