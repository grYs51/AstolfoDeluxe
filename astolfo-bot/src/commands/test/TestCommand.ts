import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { Repository } from 'typeorm';
import AppdataSource from '../..';

export default class TestCommand extends BaseCommand {
  constructor(
  ) {
    super('test', 'testing', []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    message.reply({
      content: 'Test command works!',
      allowedMentions: {
        repliedUser: false,
      },
    });

    message.react('💩').catch(console.error);
  }
}
