import { Message, Role } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import process from 'process';
import { getRepository, Repository } from 'typeorm';
import RoleInfo from '../../typeOrm/entities/RoleInfo';

export default class InitRoles extends BaseCommand {
  constructor(
    private readonly guildRolesRepository: Repository<RoleInfo> = getRepository(
      RoleInfo,
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
        for (const role of guild[1].roles.cache)
          this.saveRoles(role[1]);
      }
      const content = `Took me ${(new Date().getTime() - date) / 1000
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

  private async saveRoles(role: Role) {
    const { id, guild, hexColor, createdAt, hoist, icon, managed, mentionable, name, position , unicodeEmoji} = role;

    const rolesDb = this.guildRolesRepository.create({
      id,
      guildId: guild.id,
      color: hexColor,
      createdAt,
      hoist,
      icon: icon ? icon : undefined,
      managed,
      mentionable,
      name,
      position,
      unicodeEmoji: unicodeEmoji ? unicodeEmoji : undefined,
    });
    await this.guildRolesRepository.save(rolesDb);
  }
}
