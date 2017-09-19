import * as Discord from 'discord.js';

export interface MessageListener {
  guild?: Discord.Guild;
  dmListener?: boolean;

  handle(message: Discord.Message): Promise<any>;
}