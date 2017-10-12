import { CommandMeta } from "../../index";
export interface PluginMeta {
    /**
     * An object mapping commands to their metadata counterparts
     *
     * @type {{
     *     [key: string]: CommandMeta
     *   }}
     * @memberof PluginMeta
     */
    commands: {
        [key: string]: CommandMeta;
    };
    /**
     * Gets the name of this plugin
     *
     * @type {string}
     * @memberof PluginMeta
     */
    name: string;
    /**
     * Gets the plugin version
     *
     * @type {(string | number)}
     * @memberof PluginMeta
     */
    version: string | number;
    /**
     * The ID of this plugin
     *
     * @type {string}
     * @memberof PluginMeta
     */
    id: string;
    /**
     * The main file of this plugin
     *
     * @type {string}
     * @memberof PluginMeta
     */
    mainFile: string;
}
