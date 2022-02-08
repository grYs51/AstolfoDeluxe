// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildCreate
import { Guild } from 'discord.js';
import BaseEvent from '../../../utils/structures/BaseEvent';
import DiscordClient from '../../../client/client';
import { getRepository, Repository } from 'typeorm';
import { GuildConfiguration } from '../../../typeOrm/entities/GuildConfiguration';
import { GuildInfo } from '../../../typeOrm/entities/GuildInfo';

export default class GuildCreateEvent extends BaseEvent {
  constructor(
    private readonly guildConfigRepository: Repository<GuildConfiguration> = getRepository(
      GuildConfiguration,
    ),
    private readonly guildInfoRepository: Repository<GuildInfo> = getRepository(
      GuildInfo,
    ),
  ) {
    super('guildCreate');
  }

  async run(client: DiscordClient, guild: Guild) {
    const config = await this.guildConfigRepository.findOne({
      guildId: guild.id,
    });

    if (config) {
      console.log('A configuration was found!');
      client.configs.set(guild.id, config);
    } else {
      console.log('A configuration was not found. Creating one!');
      const newConfig = this.guildConfigRepository.create({
        guildId: guild.id,
      });

      const savedConfig = await this.guildConfigRepository.save(newConfig);
      client.configs.set(guild.id, savedConfig);
    }

    try {
      const guildInfo = this.guildInfoRepository.create({
        id: guild.id,
        name: guild.name,
        icon: guild.iconURL() ? guild.iconURL()! : undefined,
        createdAt: guild.createdAt,
      });
      await this.guildInfoRepository.save(guildInfo);
    } catch (e: any) {}
  }
}
