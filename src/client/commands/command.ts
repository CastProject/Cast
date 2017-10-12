import * as Discord from 'discord.js';
import {Cast} from '../cast';
import {Plugin} from '../plugins/Plugin';
import {Response} from '../util/response';

export interface Command {
  /**
   * The owner of this command
   * 
   * @type {Plugin}
   * @memberof Command
   */
  parent: Plugin;

  /**
   * A reference to the Cast instance
   * 
   * @type {Cast}
   * @memberof Command
   */
  cast: Cast;


  /**
   * Handles a message event
   * 
   * @param {Discord.Message} message The message event
   * @param {string[]} args The arguments
   * @returns {Promise<void>} The completed command, or an error that occurred.
   * @memberof Command
   */
  handle(response: Response, message: Discord.Message, args: string[]): Promise<void>;
}