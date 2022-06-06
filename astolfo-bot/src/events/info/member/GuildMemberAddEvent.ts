// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberAdd
import { GuildMember } from 'discord.js';
import BaseEvent from '../../../utils/structures/BaseEvent';
import DiscordClient from '../../../client/client';
import { Repository } from 'typeorm';
import { GuildMemberInfo } from '../../../typeOrm/entities/GuildMemberInfo';
import AppdataSource from '../../..';

export default class GuildMemberAddEvent extends BaseEvent {
  constructor(
    private readonly guildMemberInfoRepository: Repository<GuildMemberInfo> = AppdataSource.getRepository(
      GuildMemberInfo,
    ),
  ) {
    super('guildMemberAdd');
  }

  async run(client: DiscordClient, member: GuildMember) {
    try {
      const { displayName, displayHexColor, joinedAt } = member;
      const { id } = member.user;
      const { id: idGuild } = member.guild;

      await this.saveMember(
        displayName,
        member.avatar,
        displayHexColor,
        joinedAt!,
        id,
        idGuild,
      );
    } catch (e: any) {
      console.log(e);
    }
  }
  private async saveMember(
    guildName: string,
    avatar: string | null,

    color: string,
    joinedAt: Date,
    user: string,
    guild: string,
  ) {
    const memberDb = this.guildMemberInfoRepository.create({
      memberId: user + guild,
      guildName,
      guildAvatar: avatar ? avatar! : undefined,
      guildColor: color ? color! : undefined,
      joinedAt,
      user,
      guild,
      isDeleted: false,
    });
    await this.guildMemberInfoRepository.save(memberDb);
  }
}
