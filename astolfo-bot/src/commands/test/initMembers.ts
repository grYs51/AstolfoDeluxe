import { GuildMember, Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import process from 'process';
import { getRepository, Repository } from 'typeorm';
import { GuildMemberInfo } from '../../typeOrm/entities/GuildMemberInfo';
import { UserInfo } from '../../typeOrm/entities/UserInfo';
import { GuildInfo } from '../../typeOrm/entities/GuildInfo';

export default class InitMembers extends BaseCommand {
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
    super('members', 'testing', []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (message.author.id != process.env.OWNER) {
      message.react('⛔');
      return;
    }

    try {
      client.guilds.cache.forEach((guild) => {
        guild.members.cache.forEach(async (member) => {
          await this.save(member);
        });
      });
    } catch (e) {
      console.log(e);
      message.react('❌');
      return;
    }

    message.react('✅');
    return;
  }

  private async save(member: GuildMember) {
    const { displayName, displayHexColor, joinedAt } = member;
    const { id, username, discriminator, bot, createdAt } = member.user;
    const {
      id: idGuild,
      name: nameGuild,
      createdAt: guildCreatedAt,
    } = member.guild;

    try {
      const guild = await this.saveGuild(
        idGuild,
        nameGuild,
        guildCreatedAt,
        member.guild.icon,
        member.guild.iconURL(),
      );

      const user = await this.saveUser(
        id,
        username,
        member.user.avatar,
        member.user.avatarURL(),
        bot,
        createdAt,
        discriminator,
      );

      await this.saveMember(
        displayName,
        member.avatar,
        member.avatarURL(),
        displayHexColor,
        joinedAt!,
        user,
        guild,
      );
    } catch (error) {
      console.log(error);
    }
  }

  private async saveGuild(
    id: string,
    name: string,
    createdAt: Date,
    icon: string | null,
    iconURL: any,
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
    discriminator: string,
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
    guild: GuildInfo,
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
      memberId: user.id + guild.id,
    });
    await this.guildMemberInfoRepository.save(memberDb);
  }
}
