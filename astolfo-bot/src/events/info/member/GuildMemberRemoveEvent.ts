// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberRemove
import { GuildMember as DiscordGuildMember } from 'discord.js';
import BaseEvent from '../../../utils/structures/BaseEvent';
import DiscordClient from '../../../client/client';
import { Repository } from 'typeorm';
import { GuildMember } from '../../../typeOrm/entities/GuildMember';
import AppdataSource from '../../..';

export default class GuildMemberRemoveEvent extends BaseEvent {
  constructor(
    private readonly guildMemberInfoRepository: Repository<GuildMember> = AppdataSource.getRepository(
      GuildMember,
    ),
  ) {
    super('guildMemberRemove');
  }

  async run(client: DiscordClient, member: DiscordGuildMember) {
    const searchedMember = await this.guildMemberInfoRepository.findOneBy({
      user: {
        id: member.user.id,
      },
      guild: {
        id: member.guild.id,
      },
    });

    if (!searchedMember) return;

    this.guildMemberInfoRepository.save({ ...searchedMember, isDeleted: true });
  }
}
