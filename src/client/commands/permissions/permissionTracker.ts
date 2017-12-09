import * as Discord from 'discord.js';
import {PermissionNode} from './permissionNode';

export interface PermissionTracker {

    /**
     * Returns whether this tracker contains the provided permission
     * 
     * @param {(string | PermissionNode)} permission The permission to check for
     * @returns {boolean} Whether this tracker contains the permission
     * @memberof PermissionTracker
     */
    hasPermission(permission: string | PermissionNode): Promise<boolean>;

    /**
     * Adds a given permission to the tracker
     * 
     * @param {(string | PermissionNode)} permission The permission to add
     * @memberof PermissionTracker
     */
    addPermission(permission: string | PermissionNode): Promise<void>;

    /**
     * Removes a given permission from the tracker
     * 
     * @param {(string | PermissionNode)} permission The permission to remove
     * @memberof PermissionTracker
     */
    revokePermission(permission: string | PermissionNode): Promise<void>;

}