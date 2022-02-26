// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberUpdate
import { GuildMember } from 'discord.js';
import BaseEvent from '../../../utils/structures/BaseEvent';
import DiscordClient from '../../../client/client';
import { GuildMemberInfo } from '../../../typeOrm/entities/GuildMemberInfo';
import { Repository, getRepository } from 'typeorm';

export default class GuildMemberUpdateEvent extends BaseEvent {
  constructor(
    private readonly guildMemberInfoRepository: Repository<GuildMemberInfo> = getRepository(
      GuildMemberInfo,
    ),
  ) {
    super('guildMemberUpdate');
  }

  async run(
    client: DiscordClient,
    oldMember: GuildMember,
    newMember: GuildMember,
  ) {
    try {
      const { displayName, displayHexColor } = newMember;

      const searchedMember = await this.guildMemberInfoRepository.findOne({
        where: {
          memberId: newMember.user.id + newMember.guild.id,
        },
      });

      if (!searchedMember) {
        console.log('no user found with this');
        return;
      }

      const memberDb = this.guildMemberInfoRepository.create({
        ...searchedMember,
        guildName: displayName,
        guildAvatar: newMember.avatar ? newMember.avatar! : undefined,
        guildColor: displayHexColor,

      });
      await this.guildMemberInfoRepository.save(memberDb);
    } catch (e: any) {
      console.log(e);
    }
  }
}
