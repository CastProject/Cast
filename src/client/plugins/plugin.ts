import {Cast} from '../cast';
import {PluginConfig} from './pluginConfig'
import {Logger} from '../util/logger';
import * as Discord from 'discord.js';
import * as events from 'events';

export interface Plugin extends events.EventEmitter {
  logger: Logger;

  onLoad(cast: Cast, config: PluginConfig, logger: Logger): Promise<any>;
  onEnable(): Promise<any>;
  onDisable(): Promise<any>;

  getName(): string;
  getVersion(): string | number;
  isDebugMode(): boolean;
  isDisabledByDefault(): boolean;

  getPluginConfig(): PluginConfig;
  getListeningEvents(): string[];
}