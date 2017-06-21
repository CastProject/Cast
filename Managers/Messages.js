const discord = require(`discord.js`);

class Messages {
    constructor (client, guild) {
        this.client = client;
        this.parameters = {
            dm: !guild,
            guild
        }
    }

    handle (message) {
        if (this.parameters.dm && !message.channel.type === `dm`) return;
        if (this.parameters.guild && message.guild.id !== this.parameters.guild.id) return;
        this.parameters.dm ?
            this.handleDM(message) :
            this.handleChat(message);
    }

    handleDM (message) {

    }

    handleChat (message) {

    }
}

module.exports = Messages;