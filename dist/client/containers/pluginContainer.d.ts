import { Plugin } from '../plugins/Plugin';
export interface PluginContainer {
    /**
     * A map of all loaded plugins keyed by their ID
     *
     * @type {Map<string, Plugin>}
     * @memberof PluginContainer
     */
    plugins: Map<string, Plugin>;
    /**
     * Load a specific plugin by its ID
     *
     * @param {string} pluginID The ID of the plugin to load
     * @returns {Promise<Plugin>} The loaded plugin
     * @memberof PluginContainer
     */
    loadPlugin(pluginID: string): Promise<Plugin>;
    /**
     * Unload a specific plugin by its ID
     *
     * @param {string} pluginID The ID of the plugin to unload
     * @returns {Promise<void>} A promise representing the completed unload
     * @memberof PluginContainer
     */
    unloadPlugin(pluginID: string): Promise<void>;
    /**
     * Reload a specific plugin by its ID
     *
     * @param {string} pluginID The ID of the plugin to reload
     * @returns {Promise<Plugin>} The reloaded plugin
     * @memberof PluginContainer
     */
    reloadPlugin(pluginID: string): Promise<Plugin>;
    /**
     * Load all plugins in the plugin directory
     *
     * @returns {Promise<Map<string, Plugin>>} A map of the loaded plugins keyed by their plugin ID
     * @memberof PluginContainer
     */
    loadAll(): Promise<Map<string, Plugin>>;
    /**
     * Unload all currently loaded plugins
     *
     * @returns {Promise<void>} A promise representing the completed unload
     * @memberof PluginContainer
     */
    unloadAll(): Promise<void>;
    /**
     * Reloads all currently loaded plugins
     *
     * @returns {Promise<Map<string, Plugin>>} A map of the reloaded plugins keyed by their plugin ID
     * @memberof PluginContainer
     */
    reloadAll(): Promise<Map<string, Plugin>>;
}
