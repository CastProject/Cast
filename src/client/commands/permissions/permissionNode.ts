export interface PermissionNode {
    name: string;
    parent?: PermissionNode;
    wildcard: boolean;
    serialize (): string;
}