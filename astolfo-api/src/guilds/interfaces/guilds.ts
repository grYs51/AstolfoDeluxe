/* eslint-disable no-unused-vars */
import ChannelInfo from 'src/utils/typeorm/entities/ChannelInfo';
import GuildConfiguration from 'src/utils/typeorm/entities/GuildConfiguration';
import GuildInfo from 'src/utils/typeorm/entities/GuildInfo';
import GuildMemberInfo from 'src/utils/typeorm/entities/GuildMemberInfo';
import GuildStatsLog from 'src/utils/typeorm/entities/GuildStatsLog';
import ModerationLog from 'src/utils/typeorm/entities/ModerationLog';
import RoleInfo from 'src/utils/typeorm/entities/RoleInfo';

export interface IGuildService {
  getGuildConfig(guildId: string): Promise<GuildConfiguration>;
  getGuildInfo(guildId: string): Promise<GuildInfo>;
  updateGuildPrefix(
    guildId: string,
    prefix: string,
  ): Promise<GuildConfiguration>;
  updateWelcomeChannel(
    guildId: string,
    welcomeChannelId: string,
  ): Promise<GuildConfiguration>;
  updateWelcomeMessage(
    guildId: string,
    welcomeMessage: string,
  ): Promise<GuildConfiguration>;
  getGuildLogs(guildId: string, fromDate?: Date): Promise<ModerationLog[]>;
  getGuildStats(guildId: string, fromDate?: Date): Promise<GuildStatsLog[]>;
  getMembers(guildId: string): Promise<GuildMemberInfo[]>;
  getChannels(guildId: string): Promise<ChannelInfo[]>;
  getRoles(guildId: string): Promise<RoleInfo[]>;
}
