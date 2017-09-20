export interface PluginConfig {
    pluginIdentifier: string;
    version: string;
    debug: boolean;
    compatibleAPIs: string[];
    disabledByDefault: boolean;
    [key: string]: string | number | boolean | string[] | number[] | boolean[];
}
