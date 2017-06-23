module.exports = class Command {

  /**
   * 
   * @param {Discord.Client} client A reference to the client that created the instance
   * @param {Object} settings The command metadata
   * @param {Plugin} [plugin] The plugin, if any, that owns this command
   */
  constructor (client, settings, plugin = null) {
    if (!client) this.log(`Invalid arguments passed to command constructor`, true)
    this.client = client
    this.meta = settings
    if (plugin) this.plugin = plugin
  }

  execute (message, response, args) {

  }

  log (data, error = false) {
    if (!data) return
    error
      ? console.error(`[ERROR] ${data}`)
      : console.log(`[INFO] ${data}`)
  }
  /**
   * 
   * @param {Discord.Message} message The message that is executing this command
   * @param {Response} response The response to be used when interacting with the user
   * @param {String[]} [args] The arguments, if any, passed to the command
   */
  execute (message, response, args = []) {

  logError (error) {
    if (!error.name) return
    this.log(`${error.name}${error.message ? `: ${error.message}` : ' was thrown.'}`, true)
    if (this.client.config.debug && error.stack) console.error(error.stack)
  }
}
