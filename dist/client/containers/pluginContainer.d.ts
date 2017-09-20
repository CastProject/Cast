import { Plugin } from '../plugins/Plugin';
export interface PluginContainer {
    plugins: Map<string, Plugin>;
    loadPlugin(pluginID: string): Promise<Plugin>;
    unloadPlugin(pluginID: string): Promise<any>;
    reloadPlugin(pluginID: string): Promise<Plugin>;
    loadAll(): Promise<Map<string, Plugin>>;
    unloadAll(): Promise<any>;
    reloadAll(): Promise<Map<string, Plugin>>;
}
