import { GuildMember } from '../../typeOrm/entities/GuildMember';
import { GuildMember as DiscordGuildMember } from 'discord.js';
import { Guild } from '../../typeOrm/entities/Guild';
import Role from '../../typeOrm/entities/Role';
import { UserInfo } from '../../typeOrm/entities/User';
import UserDto from './userDto';
import GuildDto from './guildDto';
import RoleDto from './roleDto';

export default class MemberDto implements GuildMember {
  constructor(member: DiscordGuildMember, roles: Role[] = []) {
    this.id = member.id + member.guild.id;
    this.user = new UserDto(member.user);
    this.guild = new GuildDto(member.guild);
    this.guildName = member.guild.name;
    this.guildAvatar = member.guild.iconURL() ? member.guild.iconURL()! : undefined;
    this.guildColor = member.displayHexColor;
    this.joinedAt = member.joinedAt ? member.joinedAt : undefined;
    this.roles = member.roles.cache.map(role => new RoleDto(role));
  }
  id: string;
  user: UserInfo;
  guild: Guild;
  guildName: string;
  guildAvatar?: string | undefined;
  guildColor?: string | undefined;
  joinedAt?: Date;
  roles: Role[];
  isDeleted?: Boolean | undefined;
}
