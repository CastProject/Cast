const discord = require(`discord.js`);
const Response = require(`../Util/Response`);
const EmbedBuilder = require(`../Util/EmbedBuilder`);

class Messages {
    constructor (client, guild) {
        this.client = client;
        this.parameters = {
            dm: !guild,
            guild
        }
    }

    handle (message = {content: ""}) {
        if (!message.content.startsWith(this.client.config.prefix) || message.content.startsWith(this.client.config.prefix + this.client.config.prefix)) return;
        if (this.parameters.dm && !message.channel.type === `dm`) return;
        if (this.parameters.guild && message.guild.id !== this.parameters.guild.id) return;
        var response = new Response(message);
        var opts = message.content.substr(1).split(" ");
        var command = this.client.managers.commands.get(opts[0]).then(command => {
            if (!command) {
                response.reply("", this.unknownCommand());
                return;
            }
            if (this.parameters.dm) {
                if (!command.meta.supportsDM) {
                    response.reply("", this.unavailable());
                    return;
                }
            }
            opts.shift();
            command.execute(message, response, opts);
        });
    }

    unknownCommand () {
        return EmbedBuilder.createErrorEmbed(`Unknown Command. Type ${this.client.config.prefix}help for help.`, {title: "Unknown Command"})
    }

    unavailable (dm = true) {
        return EmbedBuilder.createErrorEmbed(`Sorry, this command can only be run in ${dm ? "DMs" : "guilds"}.`, {title: "Unsupported Environment"})
    }
}

module.exports = Messages;