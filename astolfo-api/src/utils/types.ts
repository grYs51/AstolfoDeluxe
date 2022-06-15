import User from './typeorm/entities/User';

export type UserDetails = {
  discordId: string;
  accesToken: string;
  refreshToken: string;
  username: string;
  discriminator: string;
};

export type UpdateUserDetails = {
  accesToken: string;
  refreshToken: string;
  username: string;
  discriminator: string;
};

export type PartialGuild = {
  id: string;
  name: string;
  icon: string;
  owner: boolean;
  permissions: string;
  features: string[];
};

type OverwriteStructure = {
  id: string;
  type: number;
  allow: string;
  deny: string;
};

export type PartialGuildChannel = {
  id: string;
  last_message_id: string;
  last_pin_timestamp?: string;
  type: number;
  name: string;
  position: number;
  parent_id?: string;
  topic?: string;
  guild_id: string;
  permission_overwrites: OverwriteStructure[];
  nsfw: boolean;
  rate_limit_per_user: number;
  banner?: string;
};

export type GuildRoles = {
  id: string;
  name: string;
  color: number;
  hoist: boolean;
  icon?: string;
  unicode_emoji?: string;
  position: number;
  permissions: string;
  managed: boolean;
  mentionable: boolean;
  tags?: RoleTags;
};

type RoleTags = {
  bot_id?: string;
  integration_id?: string;
  premium_subscriber?: null;
};

export type ModerationActionType = 'ban' | 'kick' | 'timeout';

export type Done = (err: Error, user: User) => void;

export type IEnvironments = {
  DB_HOST: string;
  DB_PORT: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;
  OWNER: string;
};
