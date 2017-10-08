export interface Util {
    /**
     * Serializes an object to JSON and saves it to the given path
     *
     * @param {object} object The object to serialize
     * @param {string} path The path to save the object
     * @memberof Util
     */
    writeJSON(object: object, path: string): any;
}
