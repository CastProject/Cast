const RichEmbed = require(`discord.js`).RichEmbed;

const EmbedDefaults = {title: null, footer: null, color: null, author: null, url: null}

const EmbedBuilder = {
    createEmbed(text, data = EmbedDefaults) {
        var embedData = {
            description: text,
            title: data.title,
            footer: data.footer,
            color: data.color,
            url: data.url,
        }
        if (data.author) embedData.author = {
            name: data.author.username,
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