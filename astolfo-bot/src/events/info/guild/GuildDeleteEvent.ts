// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildDelete
import { Guild as DiscordGuild } from 'discord.js';
import BaseEvent from '../../../utils/structures/BaseEvent';
import DiscordClient from '../../../client/client';
import { Repository } from 'typeorm';
import { Guild } from '../../../typeOrm/entities/Guild';
import AppdataSource from '../../..';

export default class GuildDeleteEvent extends BaseEvent {
  constructor(
    private readonly guildInfoRepository: Repository<Guild> = AppdataSource.getRepository(
      Guild,
    ),
  ) {
    super('guildDelete');
  }

  async run(client: DiscordClient, guild: DiscordGuild) {
    const guildDb = this.guildInfoRepository.findOneBy({
      id: guild.id,
    });
    if (!guildDb) return;
    await this.guildInfoRepository.save({ ...guildDb, isDeleted: true });
  }
}
