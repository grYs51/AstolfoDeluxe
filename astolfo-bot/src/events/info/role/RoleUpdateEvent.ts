// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-roleUpdate
import { Role } from 'discord.js';
import BaseEvent from '../../../utils/structures/BaseEvent';
import DiscordClient from '../../../client/client';
import { Repository } from 'typeorm';
import RoleInfo from '../../../typeOrm/entities/RoleInfo';
import AppdataSource from '../../..';

export default class RoleUpdateEvent extends BaseEvent {
  constructor(
    private readonly roleInfoRepository: Repository<RoleInfo> = AppdataSource.getRepository(
      RoleInfo,
    ),
  ) {
    super('roleUpdate');
  }

  async run(client: DiscordClient, oldRole: Role, newRole: Role) {
    const role = await this.roleInfoRepository.findOneBy({
      id: oldRole.id,
    });

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
