import * as Discord from 'discord.js';
import {PermissionNode} from './permissionNode';

export interface PermissionTracker {

    /**
     * The unique ID of this permission tracker
     * 
     * It will be in the provided format:
     * user-USER.ID
     * GUILDID-(role|member)-(ROLE.ID|MEMBER.ID)
     * 
     * @type {Discord.Snowflake}
     * @memberof PermissionTracker
     */
    id: Discord.Snowflake;

    /**
     * Returns whether this tracker contains the provided permission
     * 
     * @param {(string | PermissionNode)} permission The permission to check for
     * @returns {boolean} Whether this tracker contains the permission
     * @memberof PermissionTracker
     */
    hasPermission(permission: string | PermissionNode): boolean;

    /**
     * Adds a given permission to the tracker
     * 
     * @param {(string | PermissionNode)} permission The permission to add
     * @memberof PermissionTracker
     */
    addPermission(permission: string | PermissionNode): void;

    /**
     * Removes a given permission from the tracker
     * 
     * @param {(string | PermissionNode)} permission The permission to remove
     * @memberof PermissionTracker
     */
    revokePermission(permission: string | PermissionNode): void;

    /**
     * Serializes this tracker
     * 
     * @returns {{id: Discord.Snowflake, permissions: string[]}} The serialized tracker
     * @memberof PermissionTracker
     */
    serialize(): {id: Discord.Snowflake, permissions: string[]}
}