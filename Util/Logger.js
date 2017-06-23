module.exports = class Logger {

  /**
   * @param {String} [prefix] The logger prefix
   */
  constructor(prefix = null) {
    this.prefix = prefix;
  }

  /**
   * Log data to the console as an error or information
   * @param {String} data The data to output to the console
   * @param {boolean} [error] Whether or not to classify this data as an error
   */
  log (data, error = false) {
    if (!data) return
    error
      ? console.error(`[ERROR] ${this.prefix ? `[${this.prefix}] ` : ""}${data}`)
      : console.log(`[INFO] ${this.prefix ? `[${this.prefix}] ` : ""}${data}`)
  }

  /**
   * Log data to the console as a warning
   * @param {String} data The data to output to the console
   */
  warn (data) {
    if (!data) return
    console.warn(`[WARN] ${this.prefix ? `[${this.prefix}] ` : ""}${data}`)
  }

  /**
   * Parse and log an error to the console
   * @param {Error} error 
   */
  logError (error) {
    if (!error.name) return
    this.log(`${this.prefix ? `[${this.prefix}] ` : ""}${error.name}${error.message ? `: ${error.message}` : ' was thrown.'}`, true)
    if (error.stack) console.error(error.stack)
  }
}