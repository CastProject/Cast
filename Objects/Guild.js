const Messages = require('../Managers/Messages')

const defaultProps = {
  autoRemove: 10
}

const GuildInstance = class CastGuild {
  /**
   *
   * @param {Discord.Guild} guild The guild to wrap into this CastGuild
   * @param {CastGuildProperties} [properties] The properties, if any, to create this guild with.
   */
  constructor (guild, properties = defaultProps) {
    this.guild = guild
    this.properties = properties
    this.messages = new Messages(guild.client.config.prefix, guild.client.managers, guild)
  }

  static DEFAULTS() {
    return defaultProps;
  }
}

module.exports = GuildInstance
module.exports.CastGuildProperties = defaultProps
