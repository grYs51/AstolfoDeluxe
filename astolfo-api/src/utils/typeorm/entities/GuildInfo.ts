import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'guild_info' })
export default class GuildInfo {
  @PrimaryColumn({ name: 'guild_id' })
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  icon?: string;

  @Column({ name: 'created_at' })
  createdAt: Date;
}
