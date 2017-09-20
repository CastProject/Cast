/// <reference types="node" />
import { Cast } from '../cast';
import { PluginConfig } from './pluginConfig';
import * as events from 'events';
export interface Plugin extends events.EventEmitter {
    onLoad(cast: Cast, config: PluginConfig): Promise<any>;
    onEnable(): Promise<any>;
    onDisable(): Promise<any>;
    getName(): string;
    getVersion(): string | number;
    isDebugMode(): boolean;
    isDisabledByDefault(): boolean;
    getPluginConfig(): PluginConfig;
    getListeningEvents(): string[];
}
