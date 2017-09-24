import { PermissionNode } from './permissionNode';
export interface PermissionNodeUtil {
    deserialize(permission: string): PermissionNode;
}
