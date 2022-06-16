import { GuildMember as DiscordGuildMember, GuildMemberRoleManager, Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import process from 'process';
import {  Repository } from 'typeorm';
import Role from '../../typeOrm/entities/Role';
import AppdataSource from '../..';
import { GuildMember } from '../../typeOrm/entities/GuildMember';
import GuildDto from '../../utils/dtos/guildDto';
import RoleDto from '../../utils/dtos/roleDto';
import MemberDto from '../../utils/dtos/memberGuildDto';

export default class InitMembers extends BaseCommand {
  constructor(
    private readonly guildMemberInfoRepository: Repository<GuildMember> = AppdataSource.getRepository(
      GuildMember,
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

  getRoles(roles: GuildMemberRoleManager): Role[] {
    let roles1: Role[] = [];
    for (const role of roles.cache.values()) {
     
      const roleDb = new RoleDto(role);
      roles1.push(roleDb);
    }
    return roles1;
  }

  private async save(member: DiscordGuildMember, roles: Role[]) {
    try {
      const memberDb = new MemberDto(member, roles);
      await this.guildMemberInfoRepository.save(memberDb);
    } catch (error) {
      console.log(error);
    }
  }


}
