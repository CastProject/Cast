import {Message, PermissionResolvable} from 'discord.js';
import {Cast} from '../cast';
import {Plugin} from '../plugins/plugin';
import {Response} from '../util/response';

export module CommandTypes {
  export type ArgumentDefinition = {
    type: 'string' | 'number' | 'mention' | 'channel' | 'boolean' | 'user' | 'role',
    name?: string,
    allRemaining?: boolean
  };

  export type ArgumentDefinitions = ArgumentDefinition[];
  export type CommandEnvironments = ["text" | "dm"];
}

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
   * The discord permissions the bot requires to execute this command
   * 
   * @type {string}
   * @memberof Command
   */
  discordPermissions?: PermissionResolvable[];

  /**
   * Discord permissions that can substitute a missing permission node
   * 
   * @type {string}
   * @memberof Command
   */
  requiredUserPerms?: PermissionResolvable[];

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
   * Whether this command is accessible to guild owners
   * 
   * @type {boolean}
   * @memberof Command
   */
  guildOwnerCommand?: boolean;
  
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
  arguments?: CommandTypes.ArgumentDefinitions;


  /**
   * Handles a message event
   * 
   * @param {Discord.Message} message The message event
   * @param {string[]} args The arguments
   * @returns {Promise<void>} The completed command, or an error that occurred.
   * @memberof Command
   */
  handle(response: Response, message: Message, args: string[]): Promise<void>;


  /**
   * The environments this command can be used in
   * 
   * @returns {(['dm' | 'group' | 'text'])} 
   * @memberof Command
   */
  supportedEnvironments?: CommandTypes.CommandEnvironments;
}