export interface IDiscordUser {
  id: number;
  discordId: string;
  accesToken: string;
  refreshToken: string;
  username: string;
  discriminator: string;
}

export interface IGuildConfig {
  id: number;
  guildId: string;
  prefix: string;
  welcomeChannelId: string;
}

export interface IGuildInfo {
  id: string;
  name: string;
  icon: string;
  createdAt: Date;
}
