import { AxiosResponse } from 'axios';
import { PartialGuild } from 'src/utils/types';

export interface IDiscordHttpService {
  fetchBotGuilds(): Promise<AxiosResponse<PartialGuild[]>>;
  fetchUserGuilds(accesToken: string): Promise<AxiosResponse<PartialGuild[]>>;
}
