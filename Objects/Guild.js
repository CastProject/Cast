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
    /** A reference to the guild that owns this CastGuild */
    this.guild = guild
    /** A reference to the properties of this guild */
    this.properties = properties
    /** A reference to the messages manager for this guild */
    this.messages = new Messages(guild.client.config.prefix, guild.client.managers, guild)
  }

  /** Gets the default properties for a CastGuild */
  static DEFAULTS() {
    return defaultProps;
  }
}

module.exports = GuildInstance
module.exports.CastGuildProperties = defaultProps
