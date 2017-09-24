import * as Discord from 'discord.js';
import { PermissionNode } from './permissionNode';
export interface PermissionTracker {
    user?: Discord.User;
    role?: Discord.Role;
    guild?: Discord.Guild;
    hasPermission(permission: string | PermissionNode): boolean;
    addPermission(permission: string | PermissionNode): void;
    revokePermission(premission: string | PermissionNode): void;
    serialize(): {
        user: Discord.Snowflake;
        role?: Discord.Snowflake;
        guild?: Discord.Snowflake;
        permissions: string[];
    };
}
