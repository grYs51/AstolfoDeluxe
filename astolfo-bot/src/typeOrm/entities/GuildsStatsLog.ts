import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { VoiceType } from '../../utils/types';
import { Guild } from './Guild';
import { GuildMember } from './GuildMember';
import { Channel } from './Channel';

@Entity({ name: 'guild_stats' })
export class GuildStatsLog {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ManyToOne(() => Guild, (guild) => guild.id)
  @JoinColumn()
  guild: Guild;

  @ManyToOne(() => GuildMember, (member) => member.id)
  @JoinColumn()
  member: GuildMember;

  // @Column({ name: 'issued_by', nullable: true })
  @ManyToOne(() => GuildMember, (member) => member.id, { nullable: true })
  @JoinColumn({ name: 'issued_by' })
  issuedBy?: GuildMember;

  @ManyToOne(() => Channel, (channel) => channel.id)
  @JoinColumn()
  channel: Channel;

  // @Column({ name: 'new_channel', nullable: true })
  @ManyToOne(() => Channel, (channel) => channel.id, {nullable: true})
  @JoinColumn({ name: 'new_channel' })
  newChannel?: Channel;

  @Column()
  type: VoiceType;

  @Column({ name: 'issued_on' })
  issuedOn: Date;

  @Column({ name: 'ended_on', nullable: true })
  endedOn?: Date;
}
