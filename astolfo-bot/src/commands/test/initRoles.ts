import { Message, Role as DiscordRole } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import process from 'process';
import { Repository } from 'typeorm';
import Role from '../../typeOrm/entities/Role';
import AppdataSource from '../..';
import RoleDto from '../../utils/dtos/roleDto';

export default class InitRoles extends BaseCommand {
  constructor(
    private readonly guildRolesRepository: Repository<Role> = AppdataSource.getRepository(
      Role,
    ),
  ) {
    super('roles', 'testing', []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (message.author.id != process.env.OWNER) {
      message.react('⛔');
      return;
    }
    const date = new Date().getTime();

    try {
      let total = 0;
      for (const guild of client.guilds.cache) {
        total += guild[1].roles.cache.size;
        for (const role of guild[1].roles.cache) this.saveRoles(role[1]);
      }
      const content = `Took me ${
        (new Date().getTime() - date) / 1000
      }s for ${total} roles!`;
      message.react('✅');
      message.reply({
        content,
        allowedMentions: {
          repliedUser: false,
        },
      });
    } catch (e) {
      console.log(e);
      message.react('❌');
      return;
    }

    message.react('✅');
    return;
  }

  private async saveRoles(role: DiscordRole) {
    const roleDb = new RoleDto(role);
    await this.guildRolesRepository.save(roleDb);
  }
}
