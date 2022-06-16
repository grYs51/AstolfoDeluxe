import { User as DiscordUser } from 'discord.js';
import { UserInfo } from '../../typeOrm/entities/User';

export default class UserDto implements UserInfo {
  constructor(user: DiscordUser) {
    this.id = user.id;
    this.name = user.username;
    this.discriminator = user.discriminator;
    this.avatar = user.avatarURL() ? user.avatarURL()! : undefined;
    this.bot = user.bot;
    this.createdAt = user.createdAt;
  }
  id: string;
  name: string;
  discriminator: string;
  avatar?: string | undefined;
  bot: boolean;
  createdAt: Date;
  isDeleted?: Boolean | undefined;
}
