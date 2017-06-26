const RichEmbed = require(`discord.js`).RichEmbed

const Colors = {
  SUCCESS: 0x26FF00,
  ERROR: 0xFF4F00,
  INFO: 0x077AE1
}

const EmbedDefaults = {title: null, footer: null, color: null, author: null, url: null}

const version = require(`../package`).version

const EmbedBuilder = new class EmbedBuilder {

  /**
   * Creates a generic embed
   * 
   * @param {String} text The description of the embed
   * @param {MessageEmbed} [data] Any data to pass to the embed. Supports RichEmbed parameters
   * @return {RichEmbed} The new embed
   */
  createEmbed (text, data = EmbedDefaults) {
    if (typeof data.footer === 'string') {
      data.footer = {text: data.footer}
    }
    var embedData = {
      description: text,
      title: data.title,
      footer: {text: `Cast v${version}${data.footer ? data.footer.text ? ` - ${data.footer.text}` : '' : ''}`},
      color: data.color,
      url: data.url
    }
    if (data.author) {
      embedData.author = {
        name: `This was authorized by ${data.author.username}#${data.author.discriminator}`,
        icon_url: data.author.avatarURL
      }
    }
    return new RichEmbed(embedData)
  }

  /**
   * Creates an embed depicting a successful outcome
   * 
   * @param {String} text The description of the embed
   * @param {MessageEmbed} [data] Any data to pass to the embed. Supports RichEmbed parameters
   * @return {RichEmbed} The new embed
   */
  createSuccessEmbed (text, data = EmbedDefaults) {
    data.color = Colors.SUCCESS
    return EmbedBuilder.createEmbed(text, data)
  }

  /**
   * Creates an embed depicting a failed outcome
   * 
   * @param {String} text The description of the embed
   * @param {MessageEmbed} [data] Any data to pass to the embed. Supports RichEmbed parameters
   * @return {RichEmbed} The new embed
   */
  createErrorEmbed (text, data = EmbedDefaults) {
    data.color = Colors.ERROR
    return EmbedBuilder.createEmbed(text, data)
  }

  /**
   * Creates an embed depicting an informative response
   * 
   * @param {String} text The description of the embed
   * @param {MessageEmbed} [data] Any data to pass to the embed. Supports RichEmbed parameters
   * @return {RichEmbed} The new embed
   */
  createInformativeEmbed (text, data = EmbedDefaults) {
    data.color = Colors.INFO
    return EmbedBuilder.createEmbed(text, data);
  }
}

module.exports = EmbedBuilder
module.exports.Colors = Colors
