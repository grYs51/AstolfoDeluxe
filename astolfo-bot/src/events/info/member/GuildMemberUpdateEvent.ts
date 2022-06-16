// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberUpdate
import { GuildMember as DiscordGuildMember } from 'discord.js';
import BaseEvent from '../../../utils/structures/BaseEvent';
import DiscordClient from '../../../client/client';
import { GuildMember } from '../../../typeOrm/entities/GuildMember';
import { Repository } from 'typeorm';
import AppdataSource from '../../..';
import MemberDto from '../../../utils/dtos/memberGuildDto';

export default class GuildMemberUpdateEvent extends BaseEvent {
  constructor(
    private readonly guildMemberInfoRepository: Repository<GuildMember> = AppdataSource.getRepository(
      GuildMember,
    ),
  ) {
    super('guildMemberUpdate');
  }

  async run(
    client: DiscordClient,
    oldMember: DiscordGuildMember,
    newMember: DiscordGuildMember,
  ) {
    try {
      const memberDb = new MemberDto(newMember);
      await this.guildMemberInfoRepository.save(memberDb);
    } catch (e: any) {
      console.log(e);
    }
  }
}
