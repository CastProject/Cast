
/**
 * This interface is meant to serve as an outline for what plugin.json files should resemble - plugin.json files will be wrapped in a CommandMeta class.
 * 
 * @export
 * @interface CommandMeta
 */
export interface CommandMeta {
  /**
   * The permission node for this command
   * 
   * @type {string}
   * @memberof Command
   */
  permission?: string;
  
    /**
     * The description of this command
     * 
     * @type {string}
     * @memberof Command
     */
    description?: string;
  
  
    /**
     * Whether this command is only accessible for global admins
     * 
     * @type {boolean}
     * @memberof Command
     */
    globalAdminOnly?: boolean;

    /**
     * Type definitions for command arguments
     * 
     * @type {(Array<{
     *     type: 'string' | 'number' | 'mention' | 'channel',
     *     name?: string,
     *     allRemaining?: boolean
     *   }>)}
     * @memberof Command
     */
    arguments?: Array<{
      type: 'string' | 'number' | 'mention' | 'channel',
      name?: string,
      allRemaining?: boolean
    }>;



    /**
     * The environments this command can be used in
     * 
     * @returns {(['dm' | 'group' | 'text'])} 
     * @memberof Command
     */
    supportedEnvironments?: ['dm' | 'text'];
}