import { GuildMember, Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import process from 'process';
import { getRepository, Repository } from 'typeorm';
import { GuildMemberInfo } from '../../typeOrm/entities/GuildMemberInfo';
import { UserInfo } from '../../typeOrm/entities/UserInfo';
import { GuildInfo } from '../../typeOrm/entities/GuildInfo';
import moment from 'moment';

export default class InitMembers extends BaseCommand {
  constructor(
    private readonly guildMemberInfoRepository: Repository<GuildMemberInfo> = getRepository(
      GuildMemberInfo,
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
      let totalmembers = 0;
      for (const guild of client.guilds.cache) {
        totalmembers += guild[1].members.cache.size;
        for (const member of guild[1].members.cache) {
          await this.save(member[1]);
        }
      }
      const content = `Took me ${
        (message.createdTimestamp - new Date().getTime()) / 1000
      }s for ${totalmembers} guildsMembers!`;
      message.react('✅');
      message.reply({
        content,
        allowedMentions: {
          repliedUser: false,
        },
      });
    } catch (e) {
      console.log(e);
      message.react('❌');
      return;
    }

    return;
  }

  private async save(member: GuildMember) {
    const { displayName, displayHexColor, joinedAt } = member;
    const { id } = member.user;
    const { id: idGuild } = member.guild;

    try {
      await this.saveMember(
        displayName,
        member.avatar,
        displayHexColor,
        joinedAt!,
        id,
        idGuild,
      );
    } catch (error) {
      console.log(error);
    }
  }

  async saveMember(
    guildName: string,
    avatar: string | null,
    color: string,
    joinedAt: Date,
    user: string,
    guild: string,
  ) {
    const memberDb = this.guildMemberInfoRepository.create({
      guildName,
      guildAvatar: avatar ? avatar! : undefined,
      guildColor: color ? color! : undefined,
      joinedAt,
      user,
      guild,
      memberId: user + guild,
    });
    await this.guildMemberInfoRepository.save(memberDb);
  }
}
