import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { Repository } from 'typeorm';
import { GuildMember } from '../../typeOrm/entities/GuildMember';
import { UserInfo } from '../../typeOrm/entities/User';
import AppdataSource from '../..';

export default class TestCommand extends BaseCommand {
  constructor(
    private readonly guildMemberInfoRepository: Repository<GuildMember> = AppdataSource.getRepository(
      GuildMember,
    ),
    private readonly userInfoRepository: Repository<UserInfo> = AppdataSource.getRepository(
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
