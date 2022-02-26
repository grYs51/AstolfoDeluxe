import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import process from 'process';
import { getRepository, Repository } from 'typeorm';
import { GuildInfo } from '../../typeOrm/entities/GuildInfo';
import moment from 'moment';

export default class InitGuilds extends BaseCommand {
  constructor(
    private readonly guildInfoRepository: Repository<GuildInfo> = getRepository(
      GuildInfo,
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
        const guildInfo = this.guildInfoRepository.create({
          id: guild1.id,
          name: guild1.name,
          createdAt: guild1.createdAt,
          icon: guild1.icon || undefined,
        });
        await this.guildInfoRepository.save(guildInfo);
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
      message.react('❌');
      return;
    }

    message.react('✅');
    return;
  }
}
