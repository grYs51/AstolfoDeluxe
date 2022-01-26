import { AxiosResponse } from 'axios';
import { PartialGuildChannel } from 'src/utils/types';

export interface IDiscordService {
  getBotGuilds();
  getUserGuilds(accesToken: string);
  getMutualGuilds(accesToken: string, userId: string);
  getGuildChannels(
    guildId: string,
  ): Promise<AxiosResponse<PartialGuildChannel[]>>;
}
