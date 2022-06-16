// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberAdd
import { GuildMember as DiscordGuildMember } from 'discord.js';
import BaseEvent from '../../../utils/structures/BaseEvent';
import DiscordClient from '../../../client/client';
import { Repository } from 'typeorm';
import { GuildMember } from '../../../typeOrm/entities/GuildMember';
import AppdataSource from '../../..';
import MemberDto from '../../../utils/dtos/memberGuildDto';

export default class GuildMemberAddEvent extends BaseEvent {
  constructor(
    private readonly guildMemberInfoRepository: Repository<GuildMember> = AppdataSource.getRepository(
      GuildMember,
    ),
  ) {
    super('guildMemberAdd');
  }

  async run(client: DiscordClient, member: DiscordGuildMember) {
    try {
      await this.saveMember(member);
    } catch (e: any) {
      console.log(e);
    }
  }
  private async saveMember(member: DiscordGuildMember) {
    const memberDb = new MemberDto(member);
    await this.guildMemberInfoRepository.save(memberDb);
  }
}
