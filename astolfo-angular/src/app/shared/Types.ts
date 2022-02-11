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

export interface GuildStats {
  id: string;
  guildId: string;
  member: GuildMemberInfo;
  issuedBy: GuildMemberInfo | null;
  channel: ChannelInfo;
  newChannel?: ChannelInfo | null;
  type: string;
  issuedOn: Date | string;
  endedOn: Date | string;
}

export interface GuildMemberInfo {
  memberId: string;
  guildName: string;
  guildAvatar: string | null;
  guildColor: string;
  joinedAt: Date | string;
  guild?: GuildInfo;
  user: UserInfo;
}

export interface ChannelInfo {
  channelId: string;
  guildId: string;
  name: string;
  nsfw: boolean | null;
  type: string;
  position: number;
  createdAt: Date | string;
  topic?: string | null;
}

export interface GuildInfo {
  id: string;
  name: string;
  icon?: string | null;
  createdAt: Date | string;
}

export interface UserInfo {
  id: string;
  name: string;
  discriminator: string;
  avatar: string | null;
  bot: boolean;
  createdAt: Date | string;
}
