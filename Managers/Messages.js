const EmbedBuilder = require(`../Util/EmbedBuilder`)
const Logger = require(`../Util/Logger`)

class Messages {
  
  /**
   * 
   * @param {Cast} cast The cast instance creating this instance
   * @param {String} prefix The prefix for detecting commands
   * @param {Object} managers The messages, plugin and DM managers
   * @param {Guild} guild The guild to associate with
   */
  constructor (cast, guild) {
    //TODO: Workaround for a really weird bug, will investigate in the future
    this.Response = require(`../Util/Response`)

    /** A reference to the Cast instance that created this instance */
    this.cast = cast;
    /** The prefix to use to detect commands */
    this.prefix = this.cast.config.prefix;

    /** The plugin and command managers */
    this.managers = this.cast.managers;

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
      if (!this.cast.hasPermission) {
        const reply = 'Cast does not have a method to check permissions. (Was looking for cast.userMeetsCriteria)'
        this.log(reply, true)
        response.reply('', this.error(reply))
        return
      }
      if (!this.cast.hasPermission(message.member ? message.member : message.author, command.permission.serialize())) {
        response.reply(this.badPerms())
        return
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
    return `Sorry! You don't have permission to execute that command.`
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
      Array.from(this.managers.plugins.plugins.values()).some(plugin => {
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
