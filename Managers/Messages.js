const EmbedBuilder = require(`../Util/EmbedBuilder`)
const Logger = require(`../Util/Logger`)

class Messages {
  /**
   *
   * @param {Discord.Guild} guild
   */
  constructor (prefix, managers, guild) {
    //TODO: Workaround for a really weird bug, will investigate in the future
    this.Response = require(`../Util/Response`)

    /** The prefix to use to detect commands */
    this.prefix = prefix

    /** The plugin and command managers */
    this.managers = managers

    /**
     * The specifications the MessagesManager was created with
     * @type {Object}
     */
    this.parameters = {
      dm: !guild,
      guild
    }

    this.logger = new Logger(this.parameters.guild ? `${this.parameters.guild.name}MessagesManager` : `MessagesManager`)
    this.log = this.logger.log
  }

  /**
   * Handles a message event given it meets the MessageManager's sepcifications
   *
   * @param {Message} message
   */
  handle (message) {
    // Check to make sure the message event is a valid command event
    if (!message.content.startsWith(this.prefix) || message.content.startsWith(this.prefix + this.prefix) || message.content === this.prefix) return
    if (this.parameters.dm && !message.channel.type === `dm`) return
    if (this.parameters.guild && message.guild.id !== this.parameters.guild.id) return
    var response = new this.Response(message)
    // Remove the command prefix and split by spaces
    var opts = message.content.substr(1).split(' ')
    this.managers.commands.get(opts[0]).then(command => {
      // Check to see if the command exists
      if (!command) command = this.pluginsContain(opts[0])
      if (!command) {
        response.reply('', this.unknownCommand())
        return
      }
      if (command.meta.permissionLevel > 0) {
        if (!message.client.userMeetsCriteria) {
          const reply = 'Client does not have a method to check permissions. (Was looking for client.userMeetsCriteria)'
          this.log(reply, true)
          response.reply('', this.error(reply))
          return
        }
        if (!message.client.userMeetsCriteria(message.author, command.meta.permissionLevel, message.guild)) {
          response.reply('', this.badPerms())
          return
        }
      }
      // Check to see if this is a DM manager and if so check if the command has support for DMs.
      if (this.parameters.dm) {
        if (!command.meta.dm) {
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
   * Generate an embed depicting an error
   * 
   * @return {RichEmbed} The embed depicting the error
   */
  error (message = null) {
    return EmbedBuilder.createErrorEmbed(message ? `\`\`\`${message}\`\`\`` : message, {title: 'An Error Occurred'})
  }

  /**
   * Generate an embed depicting an unknown command
   * 
   * @return {RichEmbed} The embed depicting the unknown command
   */
  unknownCommand () {
    return EmbedBuilder.createErrorEmbed(`Unknown Command. Type ${this.prefix}help for help.`, {title: 'Unknown Command'})
  }

  /**
   * Generate an embed depicting insufficient permissions
   * 
   * @return {RichEmbed} The embed depicting insufficient permissions
   */
  badPerms () {
    return EmbedBuilder.createErrorEmbed(`Sorry! You don't have permission to execute that command.`, {title: 'Insufficient Permissions'})
  }

  /**
   * Generate an embed depicting an unsupported environment
   *
   * @param {boolean} [dm] Whether or not the command can only be run in a DM, defaults to false
   * @return {RichEmbed} The embed depicting an unsupported environment
   */
  unavailable (dm = false) {
    return EmbedBuilder.createErrorEmbed(`Sorry, this command can only be run in ${dm ? 'DMs' : 'guilds'}.`, {title: 'Unsupported Environment'})
  }

  /**
   * Checks to see if any plugins own the desired command string, then return it
   * @param {*} cstr
   * @return {Plugin} Returns the plugin that owns the command, if any
   */
  pluginsContain (cstr) {
    if (this.managers.plugins) {
      var command = null
      Array.from(this.managers.plugins.plugins.values()).some(data => {
        var plugin = data.plugin
        if (this.managers.plugins.pluginDisabled(plugin.metadata.bundleID, this.parameters.guild ? this.parameters.guild : null)) return true
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
