/* eslint-disable radix */
/* eslint-disable no-bitwise */
import { Inject, Injectable } from '@nestjs/common';
import { SERVICES } from 'src/utils/constants';
import { IDiscordService } from '../interfaces/discord';
import { IDiscordHttpService } from '../interfaces/discord-http';

@Injectable()
export default class DiscordService implements IDiscordService {
  constructor(
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
    const { data: UserGuilds } = await this.getUserGuilds(accesToken);
    const { data: BotGuilds } = await this.getBotGuilds();

    if (userId.toString() === process.env.OWNER) {
      return BotGuilds;
    }

    const mutualGuilds = UserGuilds.filter(
      ({ permissions }) => (parseInt(permissions) & 0x10) === 0x10,
    ).filter((guild) => BotGuilds.some((BotGuild) => BotGuild.id === guild.id));

    return mutualGuilds;
  }

  getGuildChannels(guildId: string) {
    return this.discorHttpService.fetchGuildChannels(guildId);
  }
}
