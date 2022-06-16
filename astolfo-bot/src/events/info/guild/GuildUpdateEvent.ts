// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildUpdate
import { Guild as DiscordGuild } from 'discord.js';
import BaseEvent from '../../../utils/structures/BaseEvent';
import DiscordClient from '../../../client/client';
import { Repository } from 'typeorm';
import { Guild } from '../../../typeOrm/entities/Guild';
import AppdataSource from '../../..';
import GuildDto from '../../../utils/dtos/guildDto';

export default class GuildUpdateEvent extends BaseEvent {
  constructor(
    private readonly guildInfoRepository: Repository<Guild> = AppdataSource.getRepository(
      Guild,
    ),
  ) {
    super('guildUpdate');
  }

  async run(
    client: DiscordClient,
    oldGuild: DiscordGuild,
    newGuild: DiscordGuild,
  ) {
    console.log(`guild Updated: ${oldGuild.name}`);

    try {
      const guild = new GuildDto(newGuild);

      await this.guildInfoRepository.save(guild);
    } catch (e: any) {
      console.log(e);
    }
  }
}
