/* eslint-disable radix */
/* eslint-disable no-bitwise */
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SERVICES } from 'src/utils/constants';
import GuildInfo from 'src/utils/typeorm/entities/GuildInfo';
import { Repository } from 'typeorm';
import { IDiscordService } from '../interfaces/discord';
import { IDiscordHttpService } from '../interfaces/discord-http';

@Injectable()
export default class DiscordService implements IDiscordService {
  constructor(
    @InjectRepository(GuildInfo)
    private readonly guildInfoRepository: Repository<GuildInfo>,
    @Inject(SERVICES.DISCORD_HTTP)
    private readonly discorHttpService: IDiscordHttpService,
  ) {}

  getBotGuilds() {
    return this.discorHttpService.fetchBotGuilds();
  }

  getUserGuilds(accesToken: string) {
    return this.discorHttpService.fetchUserGuilds(accesToken);
  }

  async getMutualGuilds(accesToken: string, userId: string) {
    // const { data: BotGuilds } = await this.getBotGuilds();

    const BotGuilds = await this.guildInfoRepository.find();

    if (userId.toString() === process.env.OWNER) {
      return BotGuilds;
    }

    const { data: UserGuilds } = await this.getUserGuilds(accesToken);

    const mutualGuilds = UserGuilds.filter(
      ({ permissions }) => (parseInt(permissions) & 0x10) === 0x10,
    ).filter((guild) => BotGuilds.some((BotGuild) => BotGuild.id === guild.id));

    return mutualGuilds;
  }

  getGuildChannels(guildId: string) {
    return this.discorHttpService.fetchGuildChannels(guildId);
  }
}
