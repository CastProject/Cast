const Messages = require('../Managers/Messages')

const defaultProps = {
  autoRemove: 10
}

const GuildInstance = class CastGuild {
  constructor (guild, properties = defaultProps) {
    this.guild = guild
    this.properties = properties
    this.messages = new Messages(guild.client, guild)
  }
}

module.exports = GuildInstance
module.exports.DefaultProperties = defaultProps
