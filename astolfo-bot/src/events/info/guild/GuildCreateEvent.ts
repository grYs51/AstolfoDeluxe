// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildCreate
import { Guild } from 'discord.js';
import BaseEvent from '../../../utils/structures/BaseEvent';
import DiscordClient from '../../../client/client';
import {  Repository } from 'typeorm';
import { GuildInfo } from '../../../typeOrm/entities/GuildInfo';
import AppdataSource from '../../..';

export default class GuildCreateEvent extends BaseEvent {
  constructor(
    private readonly guildInfoRepository: Repository<GuildInfo> = AppdataSource.getRepository(
      GuildInfo,
    ),
  ) {
    super('guildCreate');
  }

  async run(client: DiscordClient, guild: Guild) {
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
