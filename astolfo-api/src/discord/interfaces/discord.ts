import { AxiosResponse } from 'axios';
import { GuildRoles, PartialGuildChannel } from 'src/utils/types';

export interface IDiscordService {
  getBotGuilds();
  getUserGuilds(accesToken: string);
  getMutualGuilds(accesToken: string, userId: string);
  getGuildChannels(
    guildId: string,
  ): Promise<AxiosResponse<PartialGuildChannel[]>>;
  getGuildRoles(guildId: string): Promise<AxiosResponse<GuildRoles[]>>;
}
