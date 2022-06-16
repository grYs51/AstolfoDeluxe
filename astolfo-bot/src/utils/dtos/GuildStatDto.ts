import { Channel } from '../../typeOrm/entities/Channel';
import { Guild } from '../../typeOrm/entities/Guild';
import {
  Guild as GuildDiscord,
  GuildMember as DiscordGuildMember,
  Channel as DiscordChannel,
  VoiceChannel,
  TextChannel,
} from 'discord.js';
import { GuildMember } from '../../typeOrm/entities/GuildMember';
import { GuildStatsLog } from '../../typeOrm/entities/GuildsStatsLog';
import { VoiceType } from '../types';
import GuildDto from './guildDto';
import MemberDto from './memberGuildDto';
import ChannelDto from './channelDto';

export default class GuildStatDto implements GuildStatsLog {
  constructor(
    guild: GuildDiscord,
    member: DiscordGuildMember,
    issuedBy: MemberDto,
    type: VoiceType,
    channel: DiscordChannel,
    date: Date,
    endedOn?: Date,
    newChannel?: DiscordChannel,
  ) {
    this.guild = new GuildDto(guild);
    this.member = new MemberDto(member);
    this.issuedBy = issuedBy;
    this.channel = new ChannelDto(channel as VoiceChannel | TextChannel);
    this.newChannel = newChannel
      ? new ChannelDto(newChannel as VoiceChannel | TextChannel)
      : undefined;
    this.type = type;
    this.issuedOn = date;
    this.endedOn = endedOn;
  }
  guild: Guild;
  member: GuildMember;
  issuedBy?: GuildMember | undefined;
  channel: Channel;
  newChannel?: Channel | undefined;
  type: VoiceType;
  issuedOn: Date;
  endedOn?: Date | undefined;
}
