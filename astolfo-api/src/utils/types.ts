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

type overwriteStructure = {
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
  permission_overwrites: overwriteStructure[];
  nsfw: boolean;
  rate_limit_per_user: number;
  banner?: string;
};

export type ModerationActionType = 'ban' | 'kick' | 'timeout';

export type Done = (err: Error, user: User) => void;
