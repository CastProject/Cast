import * as Discord from 'discord.js';

export interface MessageListener {


  /**
   * The guild, if any, that this listener is bound to
   * 
   * @type {Discord.Guild}
   * @memberof MessageListener
   */
  guild?: Discord.Guild;


  /**
   * Whether or not this is a direct-message listener
   * 
   * @type {boolean}
   * @memberof MessageListener
   */
  dmListener: boolean;


  /**
   * Handles a message
   * 
   * @param {Discord.Message} message The message to handle
   * @returns {Promise<any>} 
   * @memberof MessageListener
   */
  handle(message: Discord.Message): Promise<any>;
}