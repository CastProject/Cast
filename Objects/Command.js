const Logger = require('../Util/Logger')

class Command {
  /**
   *
   * @param {Discord.Client} client A reference to the client that created the instance
   * @param {Object} settings The command metadata
   * @param {Plugin} [plugin] The plugin, if any, that owns this command
   */
  constructor (client, settings, plugin = null) {
    if (!client) this.log(`Invalid arguments passed to command constructor`, true)
    /** A reference to the client that created this instance */
    this.client = client
    /** A reference to the command metadata */
    this.meta = settings

    if (plugin) {
      /** A reference to the plugin, if any, that owns this command */
      this.plugin = plugin
    }
    this.logger = new Logger(settings.command ? settings.command : settings.file ? settings.file : __filename)
  }

  /**
   * Called whenever the command is executed in chat.
   * 
   * @param {Message} message The message that is executing this command
   * @param {Response} response The response to be used when interacting with the user
   * @param {String[]} [args] The arguments, if any, passed to the command
   */
  execute (message, response, args = []) {

  }
}


module.exports = Command;