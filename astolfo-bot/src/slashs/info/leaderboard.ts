import { CommandInteraction, CacheType } from 'discord.js';
import DiscordInteractions, { PartialApplicationCommand } from 'slash-commands';
import { Repository } from 'typeorm';
import AppdataSource from '../..';
import client from '../../client/client';
import { GuildStatsLog } from '../../typeOrm/entities/GuildsStatsLog';
import BaseSlash from '../../utils/structures/BaseSlash';

export default class LeaderboardEvent extends BaseSlash {
  constructor(
    private readonly guildStatsRepository: Repository<GuildStatsLog> = AppdataSource.getRepository(
      GuildStatsLog),
  ) {
    super('leaderboard');
  }

  async createInteraction(
    client: client,
    interaction: DiscordInteractions,
  ): Promise<void> {
    const command: PartialApplicationCommand = {
      name: 'leaderboard',
      description: 'Leaderboard!',
    };

    await interaction
      .createApplicationCommand(command)
      .then(() => {
        console.log('Leaderboard command created!');
      })
      .catch(console.error);
  }
  async run(client: client, interaction: CommandInteraction<CacheType>): Promise<void> {
    const guild = interaction.guild;
    if(!guild) return;
    const stats = await this.guildStatsRepository.find({
      where: {
        guild: {
          id: '571011756181291008',
        },
        type: 'VOICE',
      },
      relations: ['guild'],
    });

    console.log(stats);
    interaction.reply('Leaderboard!');
  }
}
