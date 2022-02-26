// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildUpdate
import { Guild } from 'discord.js';
import BaseEvent from '../../../utils/structures/BaseEvent';
import DiscordClient from '../../../client/client';
import { getRepository, Repository } from 'typeorm';
import { GuildInfo } from '../../../typeOrm/entities/GuildInfo';

export default class GuildUpdateEvent extends BaseEvent {
  constructor(
    private readonly guildInfoRepository: Repository<GuildInfo> = getRepository(
      GuildInfo,
    ),
  ) {
    super('guildUpdate');
  }

  async run(client: DiscordClient, oldGuild: Guild, newGuild: Guild) {
    console.log(`guild Updated: ${oldGuild.name}`);

    try {
      const guildInfo = this.guildInfoRepository.create({
        id: oldGuild.id,
        name: newGuild.name,
        createdAt: oldGuild.createdAt,
        icon: newGuild.iconURL() ? newGuild.iconURL()! : undefined,
      });

      await this.guildInfoRepository.save(guildInfo);
    } catch (e: any) {
      console.log(e);
    }
  }
}
