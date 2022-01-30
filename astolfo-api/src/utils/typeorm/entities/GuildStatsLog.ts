import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'guild_stats' })
export class GuildStatsLog {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ name: 'guild_id' })
  guildId: string;

  @Column({ name: 'member_id' })
  memberId: string;

  @Column({ name: 'issued_by', nullable: true })
  issuedBy: string;

  @Column()
  type: string;

  @Column({ name: 'issued_on' })
  issuedOn: Date;
}
