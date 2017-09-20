import * as Discord from 'discord.js';
import { MessageListener } from './listeners/messageListener';
import { Logger } from './util/logger';
import { PluginContainer } from './containers/pluginContainer';
import { EmbedFactory } from './util/embedFactory';
import { Util } from './util/util';
export interface Cast {
    client: Discord.Client;
    logger: Logger;
    messageListeners: Discord.Collection<Discord.Snowflake, MessageListener>;
    dmListener: MessageListener;
    libraries: {
        embedFactory: EmbedFactory;
        util: Util;
    };
    pluginContainer: PluginContainer;
    isDebug(): boolean;
    getToken(): string;
    getGlobalAdmins(): string[];
    getDefaultPermissions(): string[];
    getCommandPrefix(): string;
    getUserBlacklist(): string[];
}
