const Response = require(`../Util/Response`)
const EmbedBuilder = require(`../Util/EmbedBuilder`)

class Messages {
  /**
   *
   * @param {Discord.Guild} guild
   */
  constructor (prefix, managers, guild) {
    this.prefix = prefix

    this.managers = managers

    /**
     * The specifications the MessagesManager was created with
     * @type {Object}
     */
    this.parameters = {
      dm: !guild,
      guild
    }
  }

  /**
   * Handles a message event given it meets the MessageManager's sepcifications
   *
   * @param {Discord.Message} message
   */
  handle (message = {content: ''}) {
    // Check to make sure the message event is a valid command event
    if (!message.content.startsWith(this.prefix) || message.content.startsWith(this.prefix + this.prefix) || message.content === this.prefix) return
    if (this.parameters.dm && !message.channel.type === `dm`) return
    if (this.parameters.guild && message.guild.id !== this.parameters.guild.id) return
    var response = new Response(message)
    // Remove the command prefix and split by spaces
    var opts = message.content.substr(1).split(' ')
    this.managers.commands.get(opts[0]).then(command => {
      // Check to see if the command exists
      if (!command) command = this.pluginsContain(opts[0])
      if (!command) {
        response.reply('', this.unknownCommand())
        return
      }
      // Check to see if this is a DM manager and if so check if the command has support for DMs.
      if (this.parameters.dm) {
        if (!command.meta.supportsDM) {
          response.reply('', this.unavailable())
          return
        }
      }
      // Remove from the command from the opts array, converting it to an arguments array
      opts.shift()
      command.execute(message, response, opts)
    })
  }

  /**
   * Generate an embed depicting an unknown command
   */
  unknownCommand () {
    return EmbedBuilder.createErrorEmbed(`Unknown Command. Type ${this.prefix}help for help.`, {title: 'Unknown Command'})
  }

  /**
   * Generate an embed depicting an unsupported environment
   *
   * @param {boolean} dm
   */
  unavailable (dm = true) {
    return EmbedBuilder.createErrorEmbed(`Sorry, this command can only be run in ${dm ? 'DMs' : 'guilds'}.`, {title: 'Unsupported Environment'})
  }

  /**
   * Checks to see if any plugins own the desired command string, then return it
   * @param {*} cstr
   */
  pluginsContain (cstr) {
    if (this.managers.plugins) {
      var command = null
      Array.from(this.managers.plugins.plugins.values()).some(data => {
        var plugin = data.plugin
        if (this.managers.plugins.pluginDisabled(plugin, this.parameters.guild ? this.parameters.guild : '0')) return true
        if (plugin.managers && plugin.managers.commands) {
          var fetched = plugin.managers.commands.getSync(cstr)
          if (fetched) {
            command = fetched
            return true
          } else return false
        }
      })
      return command
    }
  }
}

module.exports = Messages
