import * as Discord from 'discord.js';
import {MessageListener} from './listeners/messageListener';
import {Logger} from './util/logger';
import {PluginContainer} from './containers/pluginContainer';
import {EmbedFactory} from './util/embedFactory';
import {Util} from './util/util';
import {CommandContainer} from './containers/commandContainer';
import {Plugin} from './plugins/plugin';
import * as mongoose from 'mongoose';
import {GuildManager} from '../index';
import {Response} from "./util/response";

export interface Cast {

  /**
   * The client that Cast will interact with
   * 
   * @type {Discord.Client}
   * @memberof Cast
   */
  client: Discord.Client;


  /**
   * The database connection (if any)
   * 
   * @type {mongoose.Mongoose}
   * @memberof Cast
   */
  mongoose: mongoose.Mongoose;


  /**
   * A circular reference to this object
   * 
   * @type {Cast}
   * @memberof Cast
   */
  cast: Cast;


  /**
   * The global logger
   * 
   * @type {Logger}
   * @memberof Cast
   */
  logger: Logger;


  /**
   * A map of message listeners by their channel
   * 
   * @type {Map<Discord.Snowflake, MessageListener>}
   * @memberof Cast
   */
  messageListeners: Map<Discord.Snowflake, MessageListener>;


  /**
   * The container of global commands
   * 
   * @type {CommandContainer}
   * @memberof Cast
   */
  commands: CommandContainer;
  

  /**
   * The implemented libraries available for plugins and commands to use
   * 
   * @type {{embedFactory: EmbedFactory, util: Util}}
   * @memberof Cast
   */
  libraries: {embedFactory: EmbedFactory, util: Util};


  /**
   * The plugin container for this Cast instance
   * 
   * @type {PluginContainer}
   * @memberof Cast
   */
  pluginContainer: PluginContainer;
  

  /**
   * Whether or not Cast is in debug mode
   * 
   * @type {boolean} Debug mode
   * @memberof Cast
   */
  debug: boolean;


  /**
   * Gets the token for this bot
   * 
   * @returns {string} The token
   * @memberof Cast
   */
  token: string;


  /**
   * Gets an array of global admins
   * 
   * @type {string[]} The global admins
   * @memberof Cast
   */
  globalAdmins: string[];


  /**
   * Gets an array of default permissions each user/role will inherit
   * 
   * @type {string[]} The default permissions
   * @memberof Cast
   */
  defaultPermissions: string[];


  /**
   * Gets the command prefix
   * 
   * @type {string} The command prefix
   * @memberof Cast
   */
  commandPrefix: string;


  /**
   * Gets an array of blacklisted users
   * 
   * @type {string[]} The blacklisted users
   * @memberof Cast
   */
  userBlacklist: string[];

  /**
   * A list of all loaded plugins
   * 
   * @type {Map<string, Plugin>}
   * @memberof Cast
   */
  plugins: Map<string, Plugin>;


  /**
   * Set the blacklist state of a user
   * 
   * @param {Discord.Snowflake} id The user to set blacklist
   * @memberof Cast
   */
  setBlacklisted(id: Discord.Snowflake, blacklist: boolean): any;


  /**
   * Builds a logger using the provided prefix tags
   * 
   * @param {string[]} prefixes The prefixes
   * @returns {Logger} The logger
   * @memberof Cast
   */
  createLogger(prefixes: string[]): Logger;


  /**
   * Checks whether or not the given entity has permission to execute a command.
   * 
   * @param {(Discord.Role | Discord.GuildMember | Discord.User)} entity The entity to check against
   * @param {string} permission The permission to check for
   * @returns {Promise<boolean>} Whether they have permission
   * @memberof Cast
   */
  hasPermission(entity: Discord.Role | Discord.GuildMember | Discord.User, permission: string): Promise<boolean>;


  /**
   * Toggles a permission for a given entity
   * 
   * @param {(Discord.Role | Discord.GuildMember | Discord.User)} entity 
   * @param {string} permission 
   * @returns {Promise<void>} 
   * @memberof Cast
   */
  togglePermission(entity: Discord.Role | Discord.GuildMember | Discord.User, permission: string): Promise<void>;

  /**
   * Revokes a permission from a given user
   * 
   * @param {(Discord.Role | Discord.GuildMember | Discord.User)} entity 
   * @param {string} permission 
   * @returns {Promise<void>} 
   * @memberof Cast
   */
  revokePermission(entity: Discord.Role | Discord.GuildMember | Discord.User, permission: string): Promise<void>;


  /**
   * Grants permission to a given user
   * 
   * @param {(Discord.Role | Discord.GuildMember | Discord.User)} entity 
   * @param {string} permission 
   * @returns {Promise<void>} 
   * @memberof Cast
   */
  grantPermission(entity: Discord.Role | Discord.GuildMember | Discord.User, permission: string): Promise<void>;  

  /**
   * Creates a command container for the provided directory
   * 
   * @param {string} commandPath The command directory
   * @returns {CommandContainer} 
   * @memberof Cast
   */
  createCommandContainer(commandPath: string, owner: Plugin): CommandContainer;


  /**
   * Gets the guild manager for a given guild
   * 
   * @param {Discord.Guild} guild 
   * @returns {Promise<GuildManager>} 
   * @memberof Cast
   */
  getGuildManager(guild: Discord.Guild): Promise<GuildManager>;

  /**
   * Creates a response wrapper for the given message
   * 
   * @param {Discord.Message} message 
   * @returns {Response} The response object
   * @memberof Cast
   */
  createResponse(message: Discord.Message): Response;
}