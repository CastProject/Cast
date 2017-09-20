export interface PluginConfig {
  pluginIdentifier: string;
  version: string;
  debug: boolean;
  compatibleAPIs: string[];

  /**
   * This determines whether or not the plugin will be disabled by default in all guilds
   */
  disabledByDefault: boolean;

  [key: string]: string | number | boolean | string[] | number[] | boolean[];
}