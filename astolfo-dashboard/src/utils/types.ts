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

export type GuildBanLogsType = {
  id: number;
  guildId: string;
  bannedMembersId: string;
  issuedBy: string;
  issuedOn: Date;
  reason?: string;
};
