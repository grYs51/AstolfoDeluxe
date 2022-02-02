import { GuildConfiguration } from './entities/GuildConfiguration';
import { User } from './entities/User';
import { Session } from './entities/Session';
import { ModerationLog } from './entities/ModerationLog';
import { GuildStatsLog } from './entities/GuildStatsLog';
import { ChannelInfo } from './entities/ChannelInfo';
import { GuildInfo } from './entities/GuildInfo';
import { GuildMemberInfo } from './entities/GuildMemberInfo';
import { UserInfo } from './entities/UserInfo';

export const entities = [
  GuildConfiguration,
  User,
  Session,
  ModerationLog,
  GuildStatsLog,
  ChannelInfo,
  GuildInfo,
  GuildMemberInfo,
  UserInfo,
];
