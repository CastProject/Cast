import * as Discord from 'discord.js';
import {MessageListener} from './listeners/messageListener';
import {Logger} from './util/logger';
import {PluginContainer} from './containers/pluginContainer';
import {EmbedFactory} from './util/embedFactory';
import {Util} from './util/util';
import {CommandContainer} from './containers/commandContainer';
import {Plugin} from './plugins/plugin';

export interface Cast {

  /**
   * The client that Cast will interact with
   * 
   * @type {Discord.Client}
   * @memberof Cast
   */
  client: Discord.Client;


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
   * @returns {boolean} Debug mode
   * @memberof Cast
   */
  isDebug(): boolean;


  /**
   * Gets the token for this bot
   * 
   * @returns {string} The token
   * @memberof Cast
   */
  getToken(): string;


  /**
   * Gets an array of global admins
   * 
   * @returns {string[]} The global admins
   * @memberof Cast
   */
  getGlobalAdmins(): string[];


  /**
   * Gets an array of default permissions each user/role will inherit
   * 
   * @returns {string[]} The default permissions
   * @memberof Cast
   */
  getDefaultPermissions(): string[];


  /**
   * Gets the command prefix
   * 
   * @returns {string} The command prefix
   * @memberof Cast
   */
  getCommandPrefix(): string;


  /**
   * Gets an array of blacklisted users
   * 
   * @returns {string[]} The blacklisted users
   * @memberof Cast
   */
  getUserBlacklist(): string[];


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
   * Creates a command container for the provided directory
   * 
   * @param {string} commandPath The command directory
   * @returns {CommandContainer} 
   * @memberof Cast
   */
  createCommandContainer(commandPath: string, owner: Plugin): CommandContainer;
}