// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberAdd
import { GuildMember, TextChannel } from "discord.js";
import BaseEvent from "../../../utils/structures/BaseEvent";
import DiscordClient from "../../../client/client";
import { Repository, getRepository } from "typeorm";
import { GuildMemberInfo } from "../../../typeOrm/entities/GuildMemberInfo";
import { UserInfo } from "../../../typeOrm/entities/UserInfo";
import { GuildInfo } from "../../../typeOrm/entities/GuildInfo";

export default class GuildMemberAddEvent extends BaseEvent {
  constructor(
    private readonly guildMemberInfoRepository: Repository<GuildMemberInfo> = getRepository(
      GuildMemberInfo
    ),
    private readonly userInfoRepository: Repository<UserInfo> = getRepository(
      UserInfo
    ),
    private readonly guildInfoRepository: Repository<GuildInfo> = getRepository(
      GuildInfo
    )
  ) {
    super("guildMemberAdd");
  }

  async run(client: DiscordClient, member: GuildMember) {
    const config = client.configs.get(member.guild.id);
    if (config) {
      if (config.welcomeChannelId) {
        const channel = member.guild.channels.cache.get(
          config.welcomeChannelId
        ) as TextChannel;
        if (!channel) {
          console.log("No welcome channel found");
        } else {
          channel.send(`Welcome ${member}`);
        }
      } else {
        console.log("No welcome channel set.");
      }
    }

    try {
      const { displayName, displayHexColor, joinedAt } = member;
      const { id, username, discriminator, createdAt, bot } = member.user;
      const {
        id: idGuild,
        name: nameGuild,
        createdAt: guildCreatedAt,
      } = member.guild;

      const guild = await this.saveGuild(
        idGuild,
        nameGuild,
        guildCreatedAt,
        member.guild.icon,
        member.guild.iconURL()
      );

      const user = await this.saveUser(
        id,
        username,
        member.avatar,
        member.avatarURL(),
        bot,
        createdAt,
        discriminator
      );

      await this.saveMember(
        displayName,
        member.avatar,
        member.avatarURL(),
        displayHexColor,
        joinedAt!,
        user,
        guild
      );
    } catch (e: any) {
      console.log(e);
    }
  }

  private async saveGuild(
    id: string,
    name: string,
    createdAt: Date,
    icon: string | null,
    iconURL: any
  ) {
    const searchedGuild = await this.guildInfoRepository.findOne(id);

    if (searchedGuild) return searchedGuild;

    const guild = this.guildInfoRepository.create({
      id,
      name,
      createdAt,
      icon: icon ? iconURL! : undefined,
    });
    await this.guildInfoRepository.save(guild);
    return guild;
  }
  private async saveUser(
    id: string,
    name: string,
    avatar: string | null,
    avaterUrl: string | null,
    bot: boolean,
    createdAt: Date,
    discriminator: string
  ) {
    const searchedUser = await this.userInfoRepository.findOne(id);

    if (searchedUser) return searchedUser;

    const user = this.userInfoRepository.create({
      id,
      name,
      avatar: avatar ? avaterUrl! : undefined,
      bot,
      createdAt: createdAt,
      discriminator,
    });
    await this.userInfoRepository.save(user);

    return user;
  }
  private async saveMember(
    guildName: string,
    avatar: string | null,
    avatarURL: string | null,
    color: string,
    joinedAt: Date,
    user: UserInfo,
    guild: GuildInfo
  ) {
    const searchedmember = await this.guildMemberInfoRepository.findOne({
      where: {
        user: user.id,
        guild: guild.id,
      },
    });

    if (searchedmember) return;

    const memberDb = this.guildMemberInfoRepository.create({
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
