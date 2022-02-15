import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { Repository, getRepository } from 'typeorm';
import { GuildMemberInfo } from '../../typeOrm/entities/GuildMemberInfo';
import { UserInfo } from '../../typeOrm/entities/UserInfo';

export default class TestCommand extends BaseCommand {
  constructor(
    private readonly guildMemberInfoRepository: Repository<GuildMemberInfo> = getRepository(
      GuildMemberInfo,
    ),
    private readonly userInfoRepository: Repository<UserInfo> = getRepository(
      UserInfo,
    ),
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
  }
}
