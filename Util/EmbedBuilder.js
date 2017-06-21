const RichEmbed = require(`discord.js`).RichEmbed;

const EmbedDefaults = {title: null, footer: null, color: null, author: null, url: null}

const EmbedBuilder = {
    createEmbed(text, data = EmbedDefaults) {
        if (typeof data.footer === 'string') {
            data.footer = {text: data.footer}
        }
        var embedData = {
            description: text,
            title: data.title,
            footer: data.footer,
            color: data.color,
            url: data.url
        }
        if (data.author) embedData.author = {
            name: `This was authorized by ${data.author.username}#${data.author.discriminator}`,
            icon_url: data.author.avatarURL
        }
        return new RichEmbed(embedData)
    },

    createSuccessEmbed(text, data = EmbedDefaults) {
        data.color = 0x26FF00;
        return EmbedBuilder.createEmbed(text, data);
    },

    createErrorEmbed(text, data = EmbedDefaults) {
        data.color = 0xFF4F00;
        return EmbedBuilder.createEmbed(text, data);
    }
}

module.exports = EmbedBuilder;