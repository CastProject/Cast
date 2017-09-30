export interface PermissionNode {

    /**
     * The title of this node
     * 
     * @type {string}
     * @memberof PermissionNode
     */
    name: string;


    /**
     * The parent, if any, of this node
     * 
     * @type {PermissionNode}
     * @memberof PermissionNode
     */
    parent?: PermissionNode;


    /**
     * Whether this node serves as a wildcard for all child nodes
     * 
     * @type {boolean}
     * @memberof PermissionNode
     */
    wildcard: boolean;


    /**
     * Serialize this node
     * 
     * @returns {string} 
     * @memberof PermissionNode
     */
    serialize (): string;
}