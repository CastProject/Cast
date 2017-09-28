import { Guild } from 'discord.js';
import { Command, Plugin, GuildConfiguration } from '../../index';
export interface GuildManager {
    guild: Guild;
    config: GuildConfiguration;
    isEnabled(object: Command | Plugin): Promise<boolean>;
    setEnabled(object: Command | Plugin, enabled: boolean): Promise<void>;
}
