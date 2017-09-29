import * as Discord from 'discord.js';
import { Cast } from '../cast';
import { Plugin } from '../plugins/plugin';
export interface Command {
    /**
     * The owner of this command, it is either a native command or a plugin command.
     *
     * @type {(Cast | Plugin)}
     * @memberof Command
     */
    parent: Cast | Plugin;
    /**
     * The permission node for this command
     *
     * @type {string}
     * @memberof Command
     */
    permission: string;
    /**
     * Whether this command is only accessible for global admins
     *
     * @type {boolean}
     * @memberof Command
     */
    globalAdminOnly: boolean;
    /**
     * Type definitions for command arguments
     *
     * @type {(Array<{
     *     optional: boolean,
     *     type: string | number | 'mention' | 'channel',
     *     name?: string
     *   }>)}
     * @memberof Command
     */
    arguments?: Array<{
        optional: boolean;
        type: String | Number | 'mention' | 'channel';
        name?: string;
    }>;
    /**
     * Handles a message event
     *
     * @param {Discord.Message} message The message event
     * @param {string[]} args The arguments
     * @returns {Promise<boolean>} Whether or not to auto-remove the sender's message after a predefined amount of time
     * @memberof Command
     */
    handle(message: Discord.Message, args: string[]): Promise<boolean>;
    /**
     * The environments this command can be used in
     *
     * @returns {(['dm' | 'group' | 'text'])}
     * @memberof Command
     */
    supportedEnvironments(): ['dm' | 'text'];
}
