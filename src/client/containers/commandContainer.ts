import {Command} from '../commands/command';

export interface CommandContainer {
  commands: Map<string, Command>;
  loadCommand(commandID: string): Promise<Command>;
  unloadCommand(commandID: string): Promise<any>;
  reloadCommand(commandID: string): Promise<Command>;
  loadAll(): Promise<Map<string, Command>>;
  unloadAll(): Promise<any>;
  reloadAll(): Promise<Map<string, Command>>;
}