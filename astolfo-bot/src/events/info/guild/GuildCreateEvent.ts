// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildCreate
import { Guild as DiscordGuild } from 'discord.js';
import BaseEvent from '../../../utils/structures/BaseEvent';
import DiscordClient from '../../../client/client';
import { Repository } from 'typeorm';
import { Guild } from '../../../typeOrm/entities/Guild';
import AppdataSource from '../../..';
import GuildDto from '../../../utils/dtos/guildDto';

export default class GuildCreateEvent extends BaseEvent {
  constructor(
    private readonly guildInfoRepository: Repository<Guild> = AppdataSource.getRepository(
      Guild,
    ),
  ) {
    super('guildCreate');
  }

  async run(client: DiscordClient, guild: DiscordGuild) {
    try {
      const guildDb = new GuildDto(guild);
      await this.guildInfoRepository.save(guildDb);
    } catch (e: any) {}
  }
}
