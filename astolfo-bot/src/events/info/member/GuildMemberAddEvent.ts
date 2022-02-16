// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberAdd
import { GuildMember, TextChannel } from 'discord.js';
import BaseEvent from '../../../utils/structures/BaseEvent';
import DiscordClient from '../../../client/client';
import { Repository, getRepository } from 'typeorm';
import { GuildMemberInfo } from '../../../typeOrm/entities/GuildMemberInfo';
import { UserInfo } from '../../../typeOrm/entities/UserInfo';
import { GuildInfo } from '../../../typeOrm/entities/GuildInfo';

export default class GuildMemberAddEvent extends BaseEvent {
  constructor(
    private readonly guildMemberInfoRepository: Repository<GuildMemberInfo> = getRepository(
      GuildMemberInfo,
    ),
    private readonly userInfoRepository: Repository<UserInfo> = getRepository(
      UserInfo,
    ),
    private readonly guildInfoRepository: Repository<GuildInfo> = getRepository(
      GuildInfo,
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
        member.avatarURL(),
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
    avatarURL: string | null,
    color: string,
    joinedAt: Date,
    user: string,
    guild: string,
  ) {
    const searchedmember = await this.guildMemberInfoRepository.findOne({
      where: {
        user: user,
        guild: guild,
      },
    });

    if (searchedmember) return;

    const memberDb = this.guildMemberInfoRepository.create({
      memberId: user + guild,
      guildName,
      guildAvatar: avatar ? avatarURL! : undefined,
      guildColor: color ? color! : undefined,
      joinedAt,
      user,
      guild,
    });
    await this.guildMemberInfoRepository.save(memberDb);
  }
}
