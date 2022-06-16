import { Guild as GuildDiscord, TextChannel, VoiceChannel } from 'discord.js';
import { Channel } from '../../typeOrm/entities/Channel';
import { Guild } from '../../typeOrm/entities/Guild';
import Role from '../../typeOrm/entities/Role';
import ChannelDto from './channelDto';
import RoleDto from './roleDto';

export default class GuildDto implements Guild {
  constructor(guild: GuildDiscord) {
    this.id = guild.id;
    this.name = guild.name;
    this.icon = guild.iconURL() ? guild.iconURL()! : undefined;
    this.roles = guild.roles.cache.map((role) => new RoleDto(role));
    this.createdAt = guild.createdAt;
  }
  id: string;
  name: string;
  icon?: string | undefined;
  createdAt: Date;
  roles: Role[];
  isDeleted?: Boolean | undefined;
}
