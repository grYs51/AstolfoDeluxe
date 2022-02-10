import { Injectable } from '@angular/core';
import {
  IDiscordUser,
  IGuildConfig,
  IGuildInfo,
  IPartialGuildChannel,
} from '../../Types';
import { RetryService } from '../../utils/Retry';

const API_URL = 'http://localhost:3001/api/';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private retrySrv: RetryService) {}

  public auth() {
    return this.retrySrv.getData<IDiscordUser>(`${API_URL}auth/status`);
  }

  public getGuildConfig(guildId: string) {
    return this.retrySrv.getData<IGuildConfig>(
      `${API_URL}guilds/${guildId}/config`,
      1
    );
  }

  public getMutualGuilds() {
    return this.retrySrv.getData<IGuildInfo[]>(`${API_URL}discord/guilds`);
  }

  public getGuildChannels(guildId: string, type: number) {
    return this.retrySrv.getData<IPartialGuildChannel[]>(
      `${API_URL}discord/guilds/${guildId}/channels/${type}`
    );
  }

  public updateGuildWelcome(guildId: string, channelId: string) {
    return this.retrySrv.postData(
      `${API_URL}guilds/${guildId}/config/welcome`,
      { channelId: channelId }
    );
  }

  public updateGuildPrefix(guildId: string, prefix: string) {
    return this.retrySrv.postData(`${API_URL}guilds/${guildId}/config/prefix`, {
      prefix,
    });
  }
}
