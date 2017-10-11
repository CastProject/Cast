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
     * @memberof Plugin
     */
    name: string;
    /**
     * Gets the plugin version
     *
     * @type {(string | number)}
     * @memberof Plugin
     */
    version: string | number;
    /**
     * The ID of this plugin
     *
     * @type {string}
     * @memberof Plugin
     */
    id: string;
}
