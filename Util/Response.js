module.exports = class Response {
    constructor(message) {
        this.message = message;
        this.channel = this.message.channel;
        this.properties = this.message.guild.manager.properties;
    }

    destructionFooter(embed) {
        if (embed && this.properties.autoRemove > -1) {
            if (!embed.footer) embed.footer = {}
            embed.footer.text = `This message will self-destruct in ${this.properties.autoRemove} seconds${embed.footer.text ? ` · ${embed.footer.text}` : '.'}`
        }
        return embed;
    }

    markForDestruction(...message) {
        if (this.properties.autoRemove > -1)
        message.forEach(m => {
            m.delete(this.properties.autoRemove * 1000)
        })
    }

    reply(text, embed, selfDestruct = true) {
        if (embed && selfDestruct) embed = this.destructionFooter(embed);
        return this.channel.send(`❮<@${this.message.author.id}>❯${text ? `: ${text}` : ""}`, embed ? {embed} : {}).then(m => {
            if (selfDestruct) this.markForDestruction(this.message, m);
        })
    }
}