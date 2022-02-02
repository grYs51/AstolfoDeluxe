export type User = {
  id: string;
  discordId: string;
};

export type PartialGuild = {
  id: string;
  name: string;
  icon: string;
  owner: boolean;
  permissions: string;
  features: string[];
};

export type GuildConfigType = {
  id: number;
  guildId: string;
  prefix: string;
  welcomeChannelId: string;
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

type overwriteStructure = {
  id: string;
  type: number;
  allow: string;
  deny: string;
};

export type GuildLogsType = {
  id: number;
  guildId: string;
  membersId: string;
  issuedBy: string;
  issuedOn: Date;
  reason?: string;
  type: string;
  duration?: number;
};

export type MemberInfo = {
  id: string;
  guildName: string;
  guildAvatar: string;
  guildColor: string;
  joinedAt: Date;
  guild: GuildInfo;
  user: UserInfo;
};

type GuildInfo = {
  id: string;
  name: string;
  icon: string;
  createdAt: Date;
};

type UserInfo = {
  id: string;
  name: string;
  discriminator: string;
  avatar: string;
  bot: boolean;
  createdAt: Date;
};
