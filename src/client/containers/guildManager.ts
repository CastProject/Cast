import {Guild} from 'discord.js';
import {Command, Plugin} from '../../index';

export interface GuildManager {
  guild: Guild;
  config: object;
  isEnabled(object: Command | Plugin): Promise<boolean>;
  setEnabled(object: Command | Plugin, enabled: boolean): Promise<void>;
}