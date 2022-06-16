import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import process from 'process';
import {  Repository } from 'typeorm';
import { Guild } from '../../typeOrm/entities/Guild';
import AppdataSource from '../..';
import GuildDto from '../../utils/dtos/guildDto';

export default class InitGuilds extends BaseCommand {
  constructor(
    private readonly guildInfoRepository: Repository<Guild> = AppdataSource.getRepository(
      Guild,
    ),
  ) {
    super('guilds', 'testing', []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (message.author.id != process.env.OWNER) {
      message.react('⛔');
      return;
    }
    const date = new Date().getTime();

    try {
      for (const guild of client.guilds.cache) {
        let guild1 = guild[1];
        const guildDB= new GuildDto(guild1);
        await this.guildInfoRepository.save(guildDB);
      }
      const content = `Took me ${(new Date().getTime() - date) / 1000}s for ${
        client.guilds.cache.size
      } guilds!`;
      message.react('✅');
      message.reply({
        content,
        allowedMentions: {
          repliedUser: false,
        },
      });
    } catch (e) {
      console.log(e);
      
      message.react('❌');
      return;
    }

    message.react('✅');
    return;
  }
}
