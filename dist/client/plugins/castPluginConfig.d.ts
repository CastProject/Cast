export interface CastPluginConfig {
    version: string;
    debug: boolean;
    compatibleAPIs: string[];
    [key: string]: string | number | boolean | string[] | number[] | boolean[];
}
