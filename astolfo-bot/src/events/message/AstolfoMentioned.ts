// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageCreate
import { Message } from 'discord.js';
import BaseEvent from '../../utils/structures/BaseEvent';
import DiscordClient from '../../client/client';
import { AiHandler } from '../../utils/handlers/AiHandler/services/AiHander.service';


export default class AstolfoMentioned extends BaseEvent {
  aiHandler = new AiHandler();
  constructor() {
    super('messageCreate');
  }

  async run(client: DiscordClient, message: Message) {
    // if (message.author.bot || !message) return;
    // const [cmdName, ...cmdArgs] = message.content.trim().split(/\s+/);
    // if (cmdName === '<@!719978622248681542>') {
    //   const reply = await this.aiHandler.test(cmdArgs.join(' '));
    //   // const content =
    //   //   GREETINGSOBJ[Math.floor(Math.random() * GREETINGSOBJ.length)];
    //   retunrnmessage.reply({
    //     content: reply,
    //     allowedMentions: {
    //       repliedUser: false,
    //     },
    //   });
    // }
  }
}
