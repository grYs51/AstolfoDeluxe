import { Injectable } from '@nestjs/common';
import { IDiscordHttpService } from '../interfaces/discord-http';
import axios from 'axios';
import { PartialGuild } from 'src/utils/types';

@Injectable()
export class DiscordHttpService implements IDiscordHttpService {
  fetchBotGuilds() {
    const TOKEN = process.env.DISCORD_BOT_TOKEN;
    return axios.get<PartialGuild[]>(
      'https://discord.com/api/v9/users/@me/guilds',
      {
        headers: {
          Authorization: `Bot ${TOKEN}`,
        },
      },
    );
  }
  fetchUserGuilds(accesToken: string) {
    return axios.get<PartialGuild[]>(
      'https://discord.com/api/v9/users/@me/guilds',
      {
        headers: {
          Authorization: `Bearer ${accesToken}`,
        },
      },
    );
  }
}
