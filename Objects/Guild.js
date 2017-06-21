const Discord = require('discord.js');

const defaultProps = {
    autoRemove: {
        successful: 10,
        failed: 5
    }
}

const GuildInstance = class Guild {
    constructor(guild, properties = defaultProps) {
        this.guild = guild;
    }
}

Discord.Guild.prototype.getManager = function() {
    if (!this.manager) this.manager = new GuildInstance(this, defaultProps);
    return this.manager;
}

module.exports = GuildInstance;