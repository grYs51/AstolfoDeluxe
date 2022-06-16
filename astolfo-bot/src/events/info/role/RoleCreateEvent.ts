// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-roleCreate
import { Role as DiscordRole } from 'discord.js';
import BaseEvent from '../../../utils/structures/BaseEvent';
import DiscordClient from '../../../client/client';
import Role from '../../../typeOrm/entities/Role';
import { Repository } from 'typeorm';
import AppdataSource from '../../..';
import RoleDto from '../../../utils/dtos/roleDto';

export default class RoleCreateEvent extends BaseEvent {
  constructor(
    private readonly roleRepository: Repository<Role> = AppdataSource.getRepository(
      Role,
    ),
  ) {
    super('roleCreate');
  }

  async run(client: DiscordClient, role: DiscordRole) {
    try {
      const roleDb = new RoleDto(role);
      await this.roleRepository.save(roleDb);
    } catch (error) {
      console.log(error);
    }
  }
}
