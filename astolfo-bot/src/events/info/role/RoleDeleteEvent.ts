// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-roleDelete
import { Role } from 'discord.js';
import BaseEvent from '../../../utils/structures/BaseEvent';
import DiscordClient from '../../../client/client';
import { Repository, getRepository } from 'typeorm';
import RoleInfo from '../../../typeOrm/entities/RoleInfo';

export default class RoleDeleteEvent extends BaseEvent {
  constructor(
    private readonly roleInfoRepository: Repository<RoleInfo> = getRepository(
      RoleInfo,
    ),
  ) {
    super('roleDelete');
  }

  async run(client: DiscordClient, role: Role) {
    const roleDb = await this.roleInfoRepository.findOneBy({
      id: role.id,
    });

    if (!role) return;

    this.roleInfoRepository.save({
      ...roleDb,
      isDeleted: true,
    });
  }
}
