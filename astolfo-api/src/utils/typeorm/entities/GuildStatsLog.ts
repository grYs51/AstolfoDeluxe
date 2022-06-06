import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import ChannelInfo from './ChannelInfo';
import GuildMemberInfo from './GuildMemberInfo';

@Entity({ name: 'guild_stats' })
export default class GuildStatsLog {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ name: 'guild_id' })
  guildId: string;

  @ManyToOne(
    () => GuildMemberInfo,
    (memberKey: GuildMemberInfo) => memberKey.memberId,
  )
  @JoinColumn({ name: 'member' })
  member: GuildMemberInfo;

  @ManyToOne(
    () => GuildMemberInfo,
    (issuedBy: GuildMemberInfo) => issuedBy.memberId,
  )
  @JoinColumn({ name: 'issued_by' })
  issuedBy: GuildMemberInfo;

  @ManyToOne(() => ChannelInfo, (channel: ChannelInfo) => channel.channelId)
  @JoinColumn({ name: 'channel' })
  channel: ChannelInfo;

  @ManyToOne(
    () => ChannelInfo,
    (newChannel: ChannelInfo) => newChannel.channelId,
  )
  @JoinColumn({ name: 'new_channel' })
  newChannel?: ChannelInfo;

  @Column()
  type: string;

  @Column({ name: 'issued_on' })
  issuedOn: Date;

  @Column({ name: 'ended_on', nullable: true })
  endedOn?: Date;
}
