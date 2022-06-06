// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberRemove
import { GuildMember } from 'discord.js';
import BaseEvent from '../../../utils/structures/BaseEvent';
import DiscordClient from '../../../client/client';
import { Repository } from 'typeorm';
import { GuildMemberInfo } from '../../../typeOrm/entities/GuildMemberInfo';
import AppdataSource from '../../..';

export default class GuildMemberRemoveEvent extends BaseEvent {
  constructor(
    private readonly guildMemberInfoRepository: Repository<GuildMemberInfo> = AppdataSource.getRepository(
      GuildMemberInfo,
    ),
  ) {
    super('guildMemberRemove');
  }

  async run(client: DiscordClient, member: GuildMember) {
    const searchedMember = await this.guildMemberInfoRepository.findOneBy({
      user: member.user.id,
      guild: member.guild.id,
    });

    if (!searchedMember) return;

    this.guildMemberInfoRepository.save({ ...searchedMember, isDeleted: true });
  }
}
