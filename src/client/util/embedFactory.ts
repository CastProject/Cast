import * as Discord from 'discord.js';

export interface EmbedFactory {
  createSuccessEmbed(author?: Discord.GuildMember | Discord.User): Discord.RichEmbed;
  createErrorEmbed(author?: Discord.GuildMember | Discord.User): Discord.RichEmbed;
  createEmbed(author?: Discord.GuildMember | Discord.User): Discord.RichEmbed;
}