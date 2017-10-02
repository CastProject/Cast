import {Message, RichEmbed, GuildMember, User} from "discord.js";

export interface Response {
  message: Message;

  reply(content: string | RichEmbed, user?: User | GuildMember): Promise<Message>;
  edit(content: string | RichEmbed): Promise<Message>;
  delete(): Promise<void>;
}