import {Cast} from '../cast';
import {Logger} from '../util/logger';
import {CommandContainer} from '../containers/commandContainer';
import {Container} from '../containers/data/container';
import {Response} from '../util/response';
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
   * The storage container for this plugin
   * 
   * @type {Container}
   * @memberof Plugin
   */
  container: Container;

  /**
   * Called on initial load, is used to give a plugin a chance to initialize before fully enabling.
   * 
   * @param {Cast} cast A reference to the Cast object that created this plugin
   * @param {Logger} logger The logger object this plugin should use
   * @param {object} [config] The configuration, if any, this plugin should use
   * @returns {Promise<void>} A promise representing the completed loading
   * @memberof Plugin
   */
  onLoad(cast: Cast, logger: Logger, container: Container): Promise<void>;


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

export type MiniCommandOperator = (this: Plugin, response: Response, message: Discord.Message, args: string[]) => Promise<void> | void;
export type MiniEventOperator = (this: Plugin) => Promise<void> | void;
export type StateChangeOperator = (this: Plugin) => Promise<void>;


export type MiniCommand = {
  name: string,
  operator: MiniCommandOperator,
  permission?: string,
  environments: ["text" | "dm"],
};

export type MiniEvent = {
  event: string,
  operator: MiniEventOperator;
};

export type DumpedPlugin = {
  commands: MiniCommand[],
  events: MiniEvent[],
  name?: string,
  version?: string,
  id?: string,
  enabled?: StateChangeOperator,
  disabled?: StateChangeOperator,
};

export type MetadataOpt = "name" | "version" | "id";

export interface PluginBuilder {
  cast: Cast;
  readonly interactedWith: boolean;
  command(name: string, operator: MiniCommandOperator, environments?: ["text", "dm"]): void;
  on(event: string, operator: MiniEventOperator): void;
  enabled(operator: StateChangeOperator): void;
  disabled(operator: StateChangeOperator): void;
  set(key: MetadataOpt, value: string): void;
  dumpedPlugin: DumpedPlugin;
  plugin: Plugin;
}

export type MiniPlugin = (plugin: PluginBuilder) => Promise<void>;