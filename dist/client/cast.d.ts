import * as Discord from 'discord.js';
import { Logger } from './util/logger';
export interface Cast {
    client: Discord.Client;
    logger: Logger;
    isDebug(): boolean;
    getToken(): string;
    getGlobalAdmins(): string[];
    getDefaultPermissions(): string[];
}
