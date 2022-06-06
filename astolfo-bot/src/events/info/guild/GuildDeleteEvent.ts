// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildDelete
import { Guild } from 'discord.js';
import BaseEvent from '../../../utils/structures/BaseEvent';
import DiscordClient from '../../../client/client';
import { Repository } from 'typeorm';
import { GuildInfo } from '../../../typeOrm/entities/GuildInfo';
import AppdataSource from '../../..';

export default class GuildDeleteEvent extends BaseEvent {
  constructor(
    private readonly guildInfoRepository: Repository<GuildInfo> = AppdataSource.getRepository(
      GuildInfo,
    ),
  ) {
    super('guildDelete');
  }

  async run(client: DiscordClient, guild: Guild) {
    const guildDb = this.guildInfoRepository.findOneBy({
      id: guild.id,
    });
    if (!guildDb) return;
    await this.guildInfoRepository.save({ ...guildDb, isDeleted: true });
  }
}
