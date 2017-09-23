import * as Discord from 'discord.js';

export interface EmbedFactory {

  /**
   * Creates an embed depicting a successful operation
   * 
   * @param {(Discord.GuildMember | Discord.User)} [author] The author, if any, to tag in the embed
   * @returns {Discord.RichEmbed} The successful embed
   * @memberof EmbedFactory
   */
  createSuccessEmbed(author?: Discord.GuildMember | Discord.User): Discord.RichEmbed;


  /**
   * Creates an embed depicting a failed operation
   * 
   * @param {(Discord.GuildMember | Discord.User)} [author] The author, if any, to tag in the embed
   * @returns {Discord.RichEmbed} The error embed
   * @memberof EmbedFactory
   */
  createErrorEmbed(author?: Discord.GuildMember | Discord.User): Discord.RichEmbed;


  /**
   * Creates a generic embed with any mixins the bot may add
   * 
   * @param {(Discord.GuildMember | Discord.User)} [author] The author, if any, to tag in the embed
   * @returns {Discord.RichEmbed} The embed
   * @memberof EmbedFactory
   */
  createEmbed(author?: Discord.GuildMember | Discord.User): Discord.RichEmbed;
}