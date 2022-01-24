// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildCreate
import { Guild } from 'discord.js';
import BaseEvent from '../utils/structures/BaseEvent';
import DiscordClient from '../client/client';
import { getRepository } from 'typeorm';
import { GuildConfiguration } from '../typeOrm/entities/GuildConfiguration';

export default class GuildCreateEvent extends BaseEvent {
  constructor(
    private readonly guildConfigRepository = getRepository
      (GuildConfiguration)
  ) {
    super('guildCreate');
  }

  async run(client: DiscordClient, guild: Guild) {
    const config = await this.guildConfigRepository.findOne({ guildId: guild.id })

    if (config) {
      console.log('A configuration was found!');
    } else {
      console.log('A configuration was not found. Creating one!');
      const newConfig = this.guildConfigRepository.create({
        guildId: guild.id,
      });

      return this.guildConfigRepository.save(newConfig);
    }
  }
}