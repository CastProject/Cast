import * as Discord from 'discord.js';
export interface MessageHandler {
    /**
     * Handles a message
     *
     * @param {Discord.Message} message The message to handle
     * @returns {Promise<any>}
     * @memberof MessageListener
     */
    handle(message: Discord.Message): Promise<any>;
}
