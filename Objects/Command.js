const Logger = require('../Util/Logger')

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
    this.logger = new Logger(settings.command ? settings.command : settings.file ? settings.file : __filename)
  }

  /**
   *
   * @param {Discord.Message} message The message that is executing this command
   * @param {Response} response The response to be used when interacting with the user
   * @param {String[]} [args] The arguments, if any, passed to the command
   */
  execute (message, response, args = []) {

  }
}
