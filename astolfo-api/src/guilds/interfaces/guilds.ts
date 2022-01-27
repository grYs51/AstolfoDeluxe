import { GuildBanLog } from 'src/utils/typeorm/entities/GuildBanLog';
import { GuildConfiguration } from 'src/utils/typeorm/entities/GuildConfiguration';

export interface IGuildService {
  getGuildConfig(guildId: string): Promise<GuildConfiguration>;
  updateGuildPrefix(
    guildId: string,
    prefix: string,
  ): Promise<GuildConfiguration>;
  updateWelcomeChannel(guildId: string, welcomeChannelId: string);
  getGuildBans(guildId: string, fromDate?: Date): Promise<GuildBanLog[]>;
}
