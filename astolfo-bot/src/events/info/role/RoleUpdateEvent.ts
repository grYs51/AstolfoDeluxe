// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-roleUpdate
import { Role } from 'discord.js';
import BaseEvent from '../../../utils/structures/BaseEvent';
import DiscordClient from '../../../client/client';
import { Repository, getRepository } from 'typeorm';
import RoleInfo from '../../../typeOrm/entities/RoleInfo';

export default class RoleUpdateEvent extends BaseEvent {
  constructor(
    private readonly roleInfoRepository: Repository<RoleInfo> = getRepository(
      RoleInfo,
    ),
  ) {
    super('roleUpdate');
  }

  async run(client: DiscordClient, oldRole: Role, newRole: Role) {
    const role = await this.roleInfoRepository.findOne(oldRole.guild.id);

    if (!role) return;

    const {
      id,
      name,
      hexColor: color,
      createdAt,
      hoist,
      rawPosition: position,
      managed,
      mentionable,
      guild,
    } = newRole;

    this.roleInfoRepository.save({
      ...role,
      name,
      color,
      position,
      mentionable,
      icon: newRole.icon ? newRole.icon! : undefined,
      unicodeEmoji: newRole.unicodeEmoji ? newRole.unicodeEmoji : undefined,
      hoist,
    });
  }
}
