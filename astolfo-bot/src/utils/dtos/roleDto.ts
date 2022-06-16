import { Role as DiscordRole } from 'discord.js';
import Role from '../../typeOrm/entities/Role';

export default class RoleDto implements Role {
  constructor(role: DiscordRole) {
    this.id = role.id;
    this.name = role.name;
    this.color = role.hexColor;
    this.createdAt = role.createdAt;
    this.hoist = role.hoist;
    this.icon = role.iconURL() ? role.iconURL()! : undefined;
    this.unicodeEmoji = role.unicodeEmoji ? role.unicodeEmoji : undefined;
    this.position = role.position;
    this.managed = role.managed;
    this.mentionable = role.mentionable;
  }
  id: string;
  name: string;
  color: string;
  createdAt: Date;
  hoist: boolean;
  icon?: string | undefined;
  unicodeEmoji?: string | undefined;
  position: number;
  managed: boolean;
  mentionable: boolean;
  isDeleted?: Boolean | undefined;
}
