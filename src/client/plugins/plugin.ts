import {Cast} from '../cast';
import {Logger} from '../util/logger';
import * as Discord from 'discord.js';
import * as events from 'events';

export interface Plugin extends events.EventEmitter {
  onLoad(cast: Cast, logger: Logger, config?: object): Promise<any>;
  onEnable(): Promise<any>;
  onDisable(): Promise<any>;

  getName(): string;
  getVersion(): string | number;
  isDebugMode(): boolean;
  isDisabledByDefault(): boolean;

  getPluginConfig(): object;
  getListeningEvents(): string[];

  /**
   * The state the plugin is in - 0 if disabled or unloaded, 1 if enabled.
   */
  getState(): number;
}