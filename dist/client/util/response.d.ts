import { Message, MessageEmbed, GuildMember, User } from "discord.js";
export interface Response {
    message: Message;
    reply(content: string | MessageEmbed, user?: User | GuildMember): Promise<Message>;
    edit(content: string | MessageEmbed): Promise<Message>;
    delete(): Promise<void>;
}
