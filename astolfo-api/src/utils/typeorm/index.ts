import { GuildConfiguration } from './entities/GuildConfiguration';
import { User } from './entities/User';
import { Session } from './entities/Session';
import { ModerationLog } from './entities/ModerationLog';
import { GuildStatsLog } from './entities/GuildStatsLog';

export const entities = [
  GuildConfiguration,
  User,
  Session,
  ModerationLog,
  GuildStatsLog,
];
