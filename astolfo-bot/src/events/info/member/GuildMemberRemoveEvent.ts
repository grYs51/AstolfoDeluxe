// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberRemove
import { GuildMember } from "discord.js";
import BaseEvent from "../../../utils/structures/BaseEvent";
import DiscordClient from "../../../client/client";
import { Repository, getRepository } from "typeorm";
import { GuildMemberInfo } from "../../../typeOrm/entities/GuildMemberInfo";

export default class GuildMemberRemoveEvent extends BaseEvent {
  constructor(
    private readonly guildMemberInfoRepository: Repository<GuildMemberInfo> = getRepository(
      GuildMemberInfo
    )
  ) {
    super("guildMemberRemove");
  }

  async run(client: DiscordClient, member: GuildMember) {
    const searchedMember = await this.guildMemberInfoRepository.findOne({
      where: {
        user: member.user.id,
        guildId: member.guild.id,
      },
    });

    if (!searchedMember) return;

    this.guildMemberInfoRepository.remove(searchedMember);
  }
}
