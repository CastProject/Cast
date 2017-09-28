export interface GuildConfiguration {
    enabledPlugins: Array<string>;
    disabledPlugins: Array<string>;
    defaultPermissions: Array<string>;
    [key: string]: Array<string | number | boolean> | string | number | boolean;
}
