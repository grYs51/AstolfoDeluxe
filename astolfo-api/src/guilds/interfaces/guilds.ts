import { GuildConfiguration } from 'src/utils/typeorm/entities/GuildConfiguration';

export interface IGuildService {
  getGuildConfig(guildId: string): Promise<GuildConfiguration>;
  updateGuildPrefix(guildId: string, prefix:string): Promise<GuildConfiguration>
}
