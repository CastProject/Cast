const CastGuild = require('../Objects/Guild')

const Response = class MessageResponse {
  /**
   * @param {Message} message The message this Response is being wrapped to
   */
  constructor (message) {
    /** A reference to the message that belongs to this response */
    this.message = message
    /** A reference to the channel creating the message for this response */
    this.channel = this.message.channel
    /** The settings for this response (auto-remove seconds, if any) */
    this.properties = this.message.guild ? this.message.guild.manager.properties : CastGuild.DEFAULTS
  }

  /**
   * Add a self-destruct message to the embed footer
   *
   * @param {MessageEmbed} embed The embed to modify
   * @return {MessageEmbed} The modified embed
   */
  destructionFooter (embed) {
    if (embed && this.properties.autoRemove > -1 && this.message.channel.type !== 'dm') {
      if (!embed.footer) embed.footer = {}
      embed.footer.text = `This message will self-destruct in ${this.properties.autoRemove} seconds${embed.footer.text ? ` · ${embed.footer.text}` : '.'}`
    }
    return embed
  }

  /**
   * Delete the given message(s) after a set amount of seconds
   *
   * @param {...String} message The message(s) to mark for destruction after the seconds defined in the properties variable
   */
  markForDestruction (...message) {
    if (this.properties.autoRemove > -1 && this.message.channel.type !== 'dm') {
      message.forEach(m => {
        m.delete(this.properties.autoRemove * 1000)
      })
    }
  }

  /**
   * Reply to the user with the given text/embed
   *
   * @param {String} text The text to reply to the user (can be an empty string or null)
   * @param {RichEmbed} [embed] The embed, if any, to send to the user
   * @param {boolean} [selfDestruct] Whether or not the message should self-destruct. Defaults to true.
   * @return {Promise} The message send event
   */
  reply (text, embed = null, selfDestruct = true) {
    if (embed && selfDestruct) embed = this.destructionFooter(embed)
    return this.channel.send(`❮<@${this.message.author.id}>❯${text ? `: ${text}` : ''}`, embed ? {embed} : {}).then(m => {
      if (selfDestruct) this.markForDestruction(this.message, m)
    })
  }
}

module.exports = Response
