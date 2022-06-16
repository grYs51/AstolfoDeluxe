// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-roleDelete
import { Role as DiscordRole } from 'discord.js';
import BaseEvent from '../../../utils/structures/BaseEvent';
import DiscordClient from '../../../client/client';
import { Repository } from 'typeorm';
import Role from '../../../typeOrm/entities/Role';
import AppdataSource from '../../..';

export default class RoleDeleteEvent extends BaseEvent {
  constructor(
    private readonly roleRepository: Repository<Role> = AppdataSource.getRepository(
      Role,
    ),
  ) {
    super('roleDelete');
  }

  async run(client: DiscordClient, role: DiscordRole) {
    const roleDb = await this.roleRepository.findOneBy({
      id: role.id,
    });

    if (!role) return;

    this.roleRepository.save({
      ...roleDb,
      isDeleted: true,
    });
  }
}
