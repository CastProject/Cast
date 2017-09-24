export interface PermissionNode {
    name: string;
    parent?: PermissionNode;

    serialize (): string;
  
    wildcard (): boolean;
}