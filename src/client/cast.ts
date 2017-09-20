import * as Discord from 'discord.js';
import {MessageListener} from './listeners/messageListener';
import {Logger} from './util/logger';

export interface Cast {
  client: Discord.Client;
  logger: Logger;
  messageListeners: Discord.Collection<Discord.Snowflake, MessageListener>;
  dmListener: MessageListener;
  
  isDebug(): boolean;
  getToken(): string;
  getGlobalAdmins(): string[];
  getDefaultPermissions(): string[];
  getCommandPrefix(): string;
  getUserBlacklist(): string[];
}