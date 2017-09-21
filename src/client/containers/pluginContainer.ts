import {Plugin} from '../plugins/Plugin';
import * as Discord from 'discord.js';

export interface PluginContainer {
  plugins: Discord.Collection<string, Plugin>;

  loadPlugin(pluginID: string): Promise<Plugin>;
  unloadPlugin(pluginID: string): Promise<any>;
  reloadPlugin(pluginID: string): Promise<Plugin>;

  loadAll(): Promise<Map<string, Plugin>>;
  unloadAll(): Promise<any>;
  reloadAll(): Promise<Map<string, Plugin>>;
}