import {
  GuildMemberRoleManager,
  Message,
  TextChannel,
  VoiceChannel,
} from 'discord.js';
import { Repository } from 'typeorm';
import AppdataSource from '../../..';
import DiscordClient from '../../../client/client';
import { Channel } from '../../../typeOrm/entities/Channel';
import { Guild } from '../../../typeOrm/entities/Guild';
import { GuildConfiguration } from '../../../typeOrm/entities/GuildConfiguration';
import { GuildMember } from '../../../typeOrm/entities/GuildMember';
import Role from '../../../typeOrm/entities/Role';
import { UserInfo } from '../../../typeOrm/entities/User';
import ChannelDto from '../../dtos/channelDto';
import GuildDto from '../../dtos/guildDto';
import MemberDto from '../../dtos/memberGuildDto';
import RoleDto from '../../dtos/roleDto';
import UserDto from '../../dtos/userDto';

export class InitHandler {
  constructor(
    private readonly channelRepository: Repository<Channel> = AppdataSource.getRepository(
      Channel,
    ),
    private readonly guildInfoRepository: Repository<Guild> = AppdataSource.getRepository(
      Guild,
    ),
    private readonly guildMemberInfoRepository: Repository<GuildMember> = AppdataSource.getRepository(
      GuildMember,
    ),
    private readonly guildRolesRepository: Repository<Role> = AppdataSource.getRepository(
      Role,
    ),
    private readonly userInfoRepository: Repository<UserInfo> = AppdataSource.getRepository(
      UserInfo,
    ),
  ) {}

  async initUsers(client: DiscordClient): Promise<init> {
    const date = new Date().getTime();

    try {
      for await (const user of client.users.cache) {
        const userDb = new UserDto(user[1]);
        await this.userInfoRepository.save(userDb);
      }
      const total = client.users.cache.size;
      const duration = (new Date().getTime() - date) / 1000;
      return { total, duration };
    } catch (e) {
      console.log(e);
      return { total: '❌', duration: '❌' };
    }
  }

  async initRoles(client: DiscordClient): Promise<init> {
    const date = new Date().getTime();

    try {
      let total = 0;
      for (const guild of client.guilds.cache) {
        total += guild[1].roles.cache.size;
        for (const role of guild[1].roles.cache) {
          const roleDb = new RoleDto(role[1]);
          await this.guildRolesRepository.save(roleDb);
        }
      }

      const duration = (new Date().getTime() - date) / 1000;
      return { total, duration };
    } catch (e) {
      console.log(e);
      return { total: '❌', duration: '❌' };
    }
  }

  async initGuilds(client: DiscordClient): Promise<init> {
    const date = new Date().getTime();

    try {
      for (const guild of client.guilds.cache) {
        let guild1 = guild[1];
        const guildDB = new GuildDto(guild1);
        await this.guildInfoRepository.save(guildDB);
      }
      const duration = (new Date().getTime() - date) / 1000;
      const total = client.guilds.cache.size;
      return { total, duration };
    } catch (e) {
      console.log(e);
      return { total: '❌', duration: '❌' };
    }
  }

  async initGuildMembers(client: DiscordClient): Promise<init> {
    const date = new Date().getTime();

    try {
      let total = 0;
      let totalRoles = 0;
      for (const guild of client.guilds.cache.values()) {
        total += guild.members.cache.size;
        for (const member of guild.members.cache.values()) {
          const obj = this.getRoles(member.roles);
          totalRoles += obj.length;
          const memberDb = new MemberDto(member, obj);
          await this.guildMemberInfoRepository.save(memberDb);
        }
      }

      const duration = (new Date().getTime() - date) / 1000;
      return { total, duration, totalRoles };
    } catch (e) {
      console.log(e);
      return { total: '❌', duration: '❌' };
    }
  }

  async initChannels(client: DiscordClient): Promise<init> {
    const date = new Date().getTime();
    try {
      let total = 0;
      for (const channel of client.channels.cache) {
        const channel1 = channel[1];
        if (channel1.isText() || channel1.isVoice() || channel1.isThread()) {
          total++;
          const channelDto = new ChannelDto(
            channel1 as TextChannel | VoiceChannel,
          );
          await this.channelRepository.save(channelDto);
        }
      }
      const duration = (new Date().getTime() - date) / 1000;
      return { total, duration };
    } catch (e) {
      console.log(e);
      return { total: '❌', duration: '❌' };
    }
  }

  getRoles(roles: GuildMemberRoleManager): Role[] {
    let roles1: Role[] = [];
    for (const role of roles.cache.values()) {
      const roleDb = new RoleDto(role);
      roles1.push(roleDb);
    }
    return roles1;
  }
}

interface init {
  total: string | number;
  duration: string | number;
  totalRoles?: string | number;
}
