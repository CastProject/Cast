export interface GuildConfiguration {
    /**
     * Fetches a stored value from the guild configuration
     *
     * @param {string} key The key
     * @param {*} [type] The type to return
     * @returns {*} The value
     * @memberof GuildConfiguration
     */
    getItem(key: string, type?: any): any;
    /**
     * Sets a value with the given key
     *
     * @param {string} key The key
     * @param {*} item The value
     * @returns {Promise<void>} The completion
     * @memberof GuildConfiguration
     */
    setItem(key: string, item: any): Promise<void>;
}
