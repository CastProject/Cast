import {Cast} from "../cast";
import {Plugin} from "./plugin";
import {Response} from "../util/response";
import {Message} from "discord.js";

export module MiniPlugin {
  export type MiniCommandOperator = (this: Plugin, response: Response, message: Message, args: string[]) => Promise<any>;
  export type MiniEventOperator = (this: Plugin) => Promise<void> | void;
  export type StateChangeOperator = (this: Plugin) => Promise<void>;
  
  
  export type MiniCommand = {
    environments: ["text" | "dm"],
    globalAdmin: boolean,
    name: string,
    operator: MiniCommandOperator,
    permission?: string,
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
    command(name: string, operator: MiniCommandOperator, permission?: string, environments?: ["text", "dm"], globalAdmin?: boolean): void;
    on(event: string, operator: MiniEventOperator): void;
    enabled(operator: StateChangeOperator): void;
    disabled(operator: StateChangeOperator): void;
    set(key: MetadataOpt, value: string): void;
    dumpedPlugin: DumpedPlugin;
    plugin: Plugin;
  }
  
  export type MiniPlugin = (plugin: PluginBuilder) => Promise<void>;
}
