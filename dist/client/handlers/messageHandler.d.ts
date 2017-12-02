import { Message, PermissionResolvable } from 'discord.js';
import { Command, CommandTypes } from "../commands/command";
export interface MessageSender {
    id: string;
    guildOwner: boolean;
    globalAdmin: boolean;
}
export interface MessageContext {
    args: string[];
    supportedEnvironment: boolean;
    requiredEnvironments: CommandTypes.CommandEnvironments;
    missingPermissions: PermissionResolvable[];
    response: Response;
    hasPermission(): Promise<boolean>;
}
export interface MessageEvent {
    message: Message;
    command: Command;
    sender: MessageSender;
    context: MessageContext;
}
export interface MessageHandler {
    /**
     * Handles a message
     *
     * @param {Message} message The message to handle
     * @returns {Promise<void>}
     * @memberof MessageListener
     */
    handle(message: Message): Promise<void>;
}
