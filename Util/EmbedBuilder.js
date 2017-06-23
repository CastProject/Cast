const RichEmbed = require(`discord.js`).RichEmbed

const Colors = {
  SUCCESS: 0x26FF00,
  ERROR: 0xFF4F00
}

const EmbedDefaults = {title: null, footer: null, color: null, author: null, url: null}

const version = require(`../package`).version;

const EmbedBuilder = {

  /**
   * Creates a generic embed, not really a reason
   * @param {String} text 
   * @param {MessageEmbed} data 
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
  },


  createSuccessEmbed (text, data = EmbedDefaults) {
    data.color = Colors.SUCCESS;
    return EmbedBuilder.createEmbed(text, data)
  },

  createErrorEmbed (text, data = EmbedDefaults) {
    data.color = Colors.ERROR;
    return EmbedBuilder.createEmbed(text, data)
  }
}

module.exports = EmbedBuilder
module.exports.Colors = Colors;
