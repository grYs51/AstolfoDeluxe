// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-roleUpdate
import { Role as DiscordRole } from 'discord.js';
import BaseEvent from '../../../utils/structures/BaseEvent';
import DiscordClient from '../../../client/client';
import { Repository } from 'typeorm';
import Role from '../../../typeOrm/entities/Role';
import AppdataSource from '../../..';
import RoleDto from '../../../utils/dtos/roleDto';

export default class RoleUpdateEvent extends BaseEvent {
  constructor(
    private readonly roleRepository: Repository<Role> = AppdataSource.getRepository(
      Role,
    ),
  ) {
    super('roleUpdate');
  }

  async run(client: DiscordClient, oldRole: DiscordRole, newRole: DiscordRole) {
    const role = await this.roleRepository.findOneBy({
      id: oldRole.id,
    });

    if (!role) return;

    const roledb = new RoleDto(newRole);

    await this.roleRepository.save({
      ...role,
      ...roledb,
    });
  }
}
