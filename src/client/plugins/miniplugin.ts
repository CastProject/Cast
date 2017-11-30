import {Cast} from "../cast";
import {Plugin} from "./plugin";
import {CommandTypes} from "../commands/command";
import {Response} from "../util/response";
import {Message, PermissionResolvable} from "discord.js";

export module MiniPlugin {
  export type MiniCommandOperator = (this: Plugin, response: Response, message: Message, args: string[]) => Promise<any>;
  export type MiniEventOperator = (this: Plugin) => Promise<void> | void;
  export type StateChangeOperator = (this: Plugin) => Promise<void>;

  export type MiniCommandOpts = {
    description?: string,
    arguments?: CommandTypes.ArgumentDefinition,
    environments?: CommandTypes.CommandEnvironments,
    globalAdmin?: boolean,
    permission?: string,
    discordPermissions?: PermissionResolvable[]
  };

  export type MiniCommand = {
    name: string,
    operator: MiniCommandOperator,
    opts?: MiniCommandOpts
  };
  
  export type MiniEvent = {
    event: string,
    operator: MiniEventOperator;
  };
  
  export type DumpedPlugin = {
    commands: MiniCommand[],
    events: MiniEvent[],
    name?: string,
    version?: string,
    id?: string,
    enabled?: StateChangeOperator,
    disabled?: StateChangeOperator,
  };
  
  export type MetadataOpt = "name" | "version" | "id";
  
  export interface PluginBuilder {
    cast: Cast;
    readonly interactedWith: boolean;
    command(name: string, operator: MiniCommandOperatorm, opts?: MiniCommandOpts): void;
    on(event: string, operator: MiniEventOperator): void;
    enabled(operator: StateChangeOperator): void;
    disabled(operator: StateChangeOperator): void;
    set(key: MetadataOpt, value: string): void;
    dumpedPlugin: DumpedPlugin;
    plugin: Plugin;
  }
  
  export type MiniPlugin = (plugin: PluginBuilder) => Promise<void>;
}
