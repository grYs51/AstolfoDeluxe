/* eslint-disable class-methods-use-this */
import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { GuildRoles, PartialGuild, PartialGuildChannel } from 'src/utils/types';
import { DISCORD_BASE_URL } from 'src/utils/constants';
import { IDiscordHttpService } from '../interfaces/discord-http';

@Injectable()
export default class DiscordHttpService implements IDiscordHttpService {
  fetchBotGuilds() {
    const TOKEN = process.env.DISCORD_BOT_TOKEN;
    return axios.get<PartialGuild[]>(`${DISCORD_BASE_URL}/users/@me/guilds`, {
      headers: {
        Authorization: `Bot ${TOKEN}`,
      },
    });
  }

  fetchUserGuilds(accesToken: string) {
    return axios.get<PartialGuild[]>(`${DISCORD_BASE_URL}/users/@me/guilds`, {
      headers: {
        Authorization: `Bearer ${accesToken}`,
      },
    });
  }

  fetchGuildChannels(guildId: string) {
    const TOKEN = process.env.DISCORD_BOT_TOKEN;
    return axios.get<PartialGuildChannel[]>(
      `${DISCORD_BASE_URL}/guilds/${guildId}/channels`,
      {
        headers: {
          Authorization: `Bot ${TOKEN}`,
        },
      },
    );
  }

  fetchGuildRoles(guildId: string): Promise<AxiosResponse<GuildRoles[]>> {
    const TOKEN = process.env.DISCORD_BOT_TOKEN;
    return axios.get<GuildRoles[]>(
      `${DISCORD_BASE_URL}/guilds/${guildId}/roles`,
      {
        headers: {
          Authorization: `Bot ${TOKEN}`,
        },
      },
    );
  }
}
