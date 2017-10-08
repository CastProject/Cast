import * as Discord from 'discord.js';
import { Cast } from '../cast';
import { Plugin } from '../plugins/plugin';
import { Response } from '../util/response';
export interface Command {
    /**
     * The owner of this command, it is either a native command or a plugin command.
     *
     * @type {(Cast | Plugin)}
     * @memberof Command
     */
    parent: Cast | Plugin;
    /**
     * A reference to the Cast instance
     *
     * @type {Cast}
     * @memberof Command
     */
    cast: Cast;
    /**
     * The permission node for this command
     *
     * @type {string}
     * @memberof Command
     */
    permission: string;
    /**
     * The description of this command
     *
     * @type {string}
     * @memberof Command
     */
    description?: string;
    /**
     * Whether this command is only accessible for global admins
     *
     * @type {boolean}
     * @memberof Command
     */
    globalAdminOnly?: boolean;
    /**
     * Type definitions for command arguments
     *
     * @type {(Array<{
     *     type: 'string' | 'number' | 'mention' | 'channel',
     *     name?: string,
     *     allRemaining?: boolean
     *   }>)}
     * @memberof Command
     */
    arguments?: Array<{
        type: 'string' | 'number' | 'mention' | 'channel';
        name?: string;
        allRemaining?: boolean;
    }>;
    /**
     * Handles a message event
     *
     * @param {Discord.Message} message The message event
     * @param {string[]} args The arguments
     * @returns {Promise<boolean>} Whether or not to auto-remove the sender's message after a predefined amount of time
     * @memberof Command
     */
    handle(response: Response, message: Discord.Message, args: string[]): Promise<boolean>;
    /**
     * The environments this command can be used in
     *
     * @returns {(['dm' | 'group' | 'text'])}
     * @memberof Command
     */
    supportedEnvironments?: ['dm' | 'text'];
}
