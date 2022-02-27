// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-roleCreate
import { Role } from 'discord.js';
import BaseEvent from '../../../utils/structures/BaseEvent';
import DiscordClient from '../../../client/client';
import RoleInfo from '../../../typeOrm/entities/RoleInfo';
import { Repository, getRepository } from 'typeorm';

export default class RoleCreateEvent extends BaseEvent {
  constructor(
    private readonly roleInfoRepository: Repository<RoleInfo> = getRepository(
      RoleInfo,
    ),
  ) {
    super('roleCreate');
  }

  async run(client: DiscordClient, role: Role) {
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
    } = role;
    try {
      const roledb = this.roleInfoRepository.create({
        id,
        name,
        color,
        createdAt,
        hoist,
        icon: role.icon ? role.icon! : undefined,
        unicodeEmoji: role.unicodeEmoji ? role.unicodeEmoji : undefined,
        position,
        managed,
        mentionable,
        guildId: guild.id,
      });
      await this.roleInfoRepository.save(roledb);
    } catch (error) {
      console.log(error);
    }
  }
}
