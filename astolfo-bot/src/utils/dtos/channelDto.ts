import { TextChannel, VoiceChannel } from 'discord.js';
import { Channel } from '../../typeOrm/entities/Channel';
import { Guild } from '../../typeOrm/entities/Guild';
import GuildDto from './guildDto';

export default class ChannelDto implements Channel {
  constructor(channel: TextChannel | VoiceChannel) {
    this.id = channel.id;
    // this.guild = new GuildDto(channel.guild);
    this.name = channel.name;
    this.type = channel.type;
    this.position = channel.position;
    this.createdAt = channel.createdAt;
    if (channel.type === 'GUILD_TEXT') {
      this.topic = channel.topic!;
      this.nsfw = channel.nsfw!;
    }
  }
  id: string;
  guild: Guild;
  name: string;
  nsfw?: boolean | undefined;
  type: string;
  position?: number | undefined;
  createdAt: Date;
  topic?: string | undefined;
  isDeleted?: Boolean | undefined;
}
