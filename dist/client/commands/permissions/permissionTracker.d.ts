import * as Discord from 'discord.js';
import { PermissionNode } from './permissionNode';
export interface PermissionTracker {
    id: Discord.Snowflake;
    hasPermission(permission: string | PermissionNode): boolean;
    addPermission(permission: string | PermissionNode): void;
    revokePermission(permission: string | PermissionNode): void;
    serialize(): {
        id: Discord.Snowflake;
        permissions: string[];
    };
}
