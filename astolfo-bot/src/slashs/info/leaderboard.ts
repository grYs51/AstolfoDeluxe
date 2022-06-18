import humanizeDuration from 'humanize-duration';
import { CommandInteraction, CacheType, MessageEmbed } from 'discord.js';
import DiscordInteractions, { PartialApplicationCommand } from 'slash-commands';
import { Repository } from 'typeorm';
import AppdataSource from '../..';
import client from '../../client/client';
import { GuildStatsLog } from '../../typeOrm/entities/GuildsStatsLog';
import BaseSlash from '../../utils/structures/BaseSlash';

export default class LeaderboardEvent extends BaseSlash {
  constructor(
    private readonly guildStatsRepository: Repository<GuildStatsLog> = AppdataSource.getRepository(
      GuildStatsLog,
    ),
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
  async run(
    client: client,
    interaction: CommandInteraction<CacheType>,
  ): Promise<void> {
    const guild = interaction.guild;
    if (!guild) {
      interaction.reply({
        content: 'This command can only be used in a server.',
        ephemeral: true,
      });
      return;
    }
    const stats = await this.guildStatsRepository.find({
      where: {
        guild: {
          id: guild.id,
        },
        type: 'VOICE',
      },
      relations: ['member', 'member.user'],
    });

    if (!stats.length) {
      interaction.reply({ content: 'No stats found!', ephemeral: true });
      return;
    }

    const leaderboard = stats.reduce((acc, stat) => {
      const a = acc.find((x) => x.id === stat.member.user.id);

      if (a) {
        a.count += stat.endedOn!.getTime() - stat.issuedOn.getTime();
      } else {
        acc.push({
          id: stat.member.user.id,
          count: stat.endedOn!.getTime() - stat.issuedOn.getTime(),
          name: stat.member.guildName,
        });
      }
      return acc;
    }, [] as Leaderboard[]);

    const sorted = leaderboard
      .sort((a, b) => {
        return b.count - a.count;
      })
      .map((x) => {
        return {
          ...x,
          time: humanizeDuration(x.count, { round: true }),
        };
      });

    const embed = new MessageEmbed()
      .setColor('#000000')
      .setTitle('Leaderboard')
      .setDescription('Time spend in voice channels')
      .addFields(
        sorted.map((x, i) => {
          return {
            name: `${i + 1}. ${x.name}`,
            value: `${x.time}`,
          };
        }),
      );

    interaction.reply({ embeds: [embed] });
  }
}

interface Leaderboard {
  id: string;
  name: string;
  count: number;
}
