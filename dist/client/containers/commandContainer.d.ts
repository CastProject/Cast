import { Command } from '../commands/command';
import { Cast } from '../cast';
import { Plugin } from '../plugins/plugin';
export interface CommandContainer {
    /**
     * The owner of this command container
     *
     * @type {(Cast | Plugin)}
     * @memberof CommandContainer
     */
    owner: Cast | Plugin;
    /**
     * The commands this container possesses
     *
     * @type {Map<string, Command>}
     * @memberof CommandContainer
     */
    commands: Map<string, Command>;
    /**
     * Loads a provided command name
     *
     * @param {string} commandID The command to load
     * @returns {Promise<Command>} The loaded command
     * @memberof CommandContainer
     */
    loadCommand(commandID: string): Promise<Command>;
    /**
     * Unloads a provided command name
     *
     * @param {string} commandID The command to unload
     * @returns {Promise<any>} The completion of the unload
     * @memberof CommandContainer
     */
    unloadCommand(commandID: string): Promise<any>;
    /**
     * Reload a provided command name
     *
     * @param {string} commandID The command to reload
     * @returns {Promise<Command>} The reloaded command
     * @memberof CommandContainer
     */
    reloadCommand(commandID: string): Promise<Command>;
    /**
     * Load all commands in the stored directory
     *
     * @returns {Promise<Map<string, Command>>} The loaded commands
     * @memberof CommandContainer
     */
    loadAll(): Promise<Map<string, Command>>;
    /**
     * Unload all loaded commands
     *
     * @returns {Promise<any>} The completion of the unload
     * @memberof CommandContainer
     */
    unloadAll(): Promise<any>;
    /**
     * Reloads all commands in the stored directory
     *
     * @returns {Promise<Map<string, Command>>} The loaded commands
     * @memberof CommandContainer
     */
    reloadAll(): Promise<Map<string, Command>>;
}
