import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { Guild } from './Guild';

@Entity({ name: 'channels' })
export class Channel {
  @PrimaryColumn()
  id: string;

  @OneToMany(() => Guild, (Guild) => Guild.id)
  @JoinColumn({ name: 'guild_id'})
  guild: Guild;

  @Column()
  name: string;

  @Column({ nullable: true })
  nsfw?: boolean;

  @Column()
  type: string;

  @Column({ nullable: true })
  position?: number;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ nullable: true })
  topic?: string;

  @Column({ name: 'is_deleted', default: false })
  isDeleted?: Boolean;
}
