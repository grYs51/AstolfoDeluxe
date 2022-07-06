import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { VoiceType } from '../../utils/types';

@Entity({ name: 'guild_stats' })
export class GuildStatsLog {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ name: 'guild_id' })
  guildId: string;

  @Column({ name: 'member_id' })
  memberId: string;

  @Column({ name: 'issued_by_id', nullable: true })
  issuedById?: string;

  @Column({ name: 'channel_id' })
  channelId: string;

  // @Column({ name: 'new_channel', nullable: true })
  @Column({ name: 'new_channel_id', nullable: true })
  newChannelId?: string;

  @Column()
  type: VoiceType;

  @Column({ name: 'issued_on' })
  issuedOn: Date;

  @Column({ name: 'ended_on', nullable: true })
  endedOn?: Date;
}
