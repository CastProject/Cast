import {Client} from "discord.js";

export interface Util {

  /**
   * Serializes an object to JSON and saves it to the given path
   * 
   * @param {object} object The object to serialize
   * @param {string} path The path to save the object
   * @memberof Util
   */
  writeJSON (object: object, path: string): Promise<void>;

  /**
   * Sanitizes the message of its mentions
   * 
   * @param {Client} client The client object to pull data from
   * @param {string} content The content to sanitize
   * @returns {string} The sanitized string
   */
  filter (client: Client, content: string): string;
}