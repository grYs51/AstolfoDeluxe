import { GuildMember, GuildMemberRoleManager, Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import process from 'process';
import {  Repository } from 'typeorm';
import { GuildMemberInfo } from '../../typeOrm/entities/GuildMemberInfo';
import RoleInfo from '../../typeOrm/entities/RoleInfo';
import AppdataSource from '../..';

export default class InitMembers extends BaseCommand {
  constructor(
    private readonly guildMemberInfoRepository: Repository<GuildMemberInfo> = AppdataSource.getRepository(
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
    const date = new Date().getTime();

    try {
      let totalmembers = 0;
      let totalroles = 0;
      for (const guild of client.guilds.cache.values()) {
        totalmembers += guild.members.cache.size;
        for (const member of guild.members.cache.values()) {
          const obj = this.getRoles(member.roles);
          totalroles += obj.length;
          await this.save(member, obj);
        }
      }
      const content = `Took me ${
        (new Date().getTime() - date) / 1000
      }s for ${totalmembers} guildsMembers \n\
      and ${totalroles} roles`;
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

  getRoles(roles: GuildMemberRoleManager): RoleInfo[] {
    let roles1: RoleInfo[] = [];
    for (const role of roles.cache.values()) {
      const {
        id,
        name,
        hexColor,
        createdAt,
        hoist,
        position,
        managed,
        mentionable,
        guild,
      } = role;
      const obj: RoleInfo = {
        id,
        name,
        color: hexColor,
        createdAt,
        hoist,
        position,
        managed,
        mentionable,
        guildId: guild.id,
      };
      roles1.push(obj);
    }
    return roles1;
  }

  private async save(member: GuildMember, roles: RoleInfo[]) {
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
        roles,
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
    roles: RoleInfo[],
  ) {
    const memberDb = this.guildMemberInfoRepository.create({
      guildName,
      guildAvatar: avatar ? avatar! : undefined,
      guildColor: color ? color! : undefined,
      joinedAt,
      user,
      guild,
      memberId: user + guild,
      roles,
    });
    await this.guildMemberInfoRepository.save(memberDb);
  }
}
