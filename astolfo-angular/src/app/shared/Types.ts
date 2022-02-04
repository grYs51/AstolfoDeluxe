export interface IDiscordUser {
  id: number;
  discordId: string;
  accesToken: string;
  refreshToken: string;
  username: string;
  discriminator: string;
}

export interface IGuildConfig {
  guildId: string;
  prefix: string;
  welcomeChannelId: string;
  welcomeMessage: string;
}

export interface IGuildInfo {
  id: string;
  name: string;
  icon: string | null;
  createdAt: Date;
}

export interface IGuildObject {
  guild: IGuildInfo;
}

export interface IPartialGuildChannel {
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
}

interface overwriteStructure {
  id: string;
  type: number;
  allow: string;
  deny: string;
}
