import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { Guild } from './Guild';

@Entity({ name: 'channel_info' })
export class Channel {
  @PrimaryColumn({ name: 'id' })
  id: string;

  @OneToMany(() => Guild, (Guild) => Guild.id)
  @JoinColumn()
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
