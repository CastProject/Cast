import {Cast} from '../cast';
import {Logger} from '../util/logger';
import {CommandContainer} from '../containers/commandContainer';
import * as Discord from 'discord.js';
import * as events from 'events';

export interface Plugin extends events.EventEmitter {

  /**
   * A reference to the cast object that created this plugin
   * 
   * @type {Cast}
   * @memberof Plugin
   */
  cast: Cast;

  /**
   * The container of commands this plugin has
   * 
   * @type {CommandContainer}
   * @memberof Plugin
   */
  commands?: CommandContainer;

  /**
   * The logger for this plugin
   * 
   * @type {Logger}
   * @memberof Plugin
   */
  logger: Logger;

  /**
   * Called on initial load, is used to give a plugin a chance to initialize before fully enabling.
   * 
   * @param {Cast} cast A reference to the Cast object that created this plugin
   * @param {Logger} logger The logger object this plugin should use
   * @param {object} [config] The configuration, if any, this plugin should use
   * @returns {Promise<void>} A promise representing the completed loading
   * @memberof Plugin
   */
  onLoad(cast: Cast, logger: Logger): Promise<void>;


  /**
   * Called when the plugin container is ready to fully enable this plugin.
   * 
   * @returns {Promise<void>} A promise representing the completed enabling
   * @memberof Plugin
   */
  onEnable(): Promise<void>;


  /**
   * Called when the plugin container has requested that this plugin is disabled.
   * 
   * @returns {Promise<void>} A promise representing the completed disabling
   * @memberof Plugin
   */
  onDisable(): Promise<void>;


  /**
   * Gets the name of this plugin
   * 
   * @type {string}
   * @memberof Plugin
   */
  name: string;


  /**
   * Gets the plugin version
   * 
   * @type {(string | number)}
   * @memberof Plugin
   */
  version: string | number;


  /**
   * Gets whether or not this plugin is in debug mode
   * 
   * @type {boolean}
   * @memberof Plugin
   */
  debugMode: boolean;

  /**
   * Gets the plugin configuration
   * 
   * @type {object}
   * @memberof Plugin
   */
  pluginConfig: object;


  /**
   * Gets the Discord events this plugin is currently listening for
   * 
   * @type {string[]}
   * @memberof Plugin
   */
  listeningEvents: string[];

  /**
   * The ID of this plugin
   * 
   * @type {string}
   * @memberof Plugin
   */
  id: string;
}