import { Injectable } from '@angular/core';
import { IDiscordUser, IGuildConfig, IGuildInfo } from '../../Types';
import { RetryService } from '../../utils/Retry';

const API_URL = 'http://localhost:3001/api/';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private retrySrv: RetryService) {}

  public auth() {
    return this.retrySrv.fetchData<IDiscordUser>(`${API_URL}auth/status`);
  }

  public getGuildConfig(guildId: string) {
    return this.retrySrv.fetchData<IGuildConfig>(
      `${API_URL}guilds/config/${guildId}`,
      1
    );
  }

  public getMutualGuilds() {
    return this.retrySrv.fetchData<IGuildInfo[]>(`${API_URL}discord/guilds`);
  }
}
