import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'guild_roles' })
export class GuildRoles {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'guild_name' })
  guildId: string

  @Column()
  name: string;

  @Column()
  color: number;

  @Column({name: 'created_at'})
  createdAt: string;

  @Column()
  hoist: boolean;

  @Column({ nullable: true })
  icon?: string;

  @Column({ name: 'unicode_emoji', nullable: true })
  unicodeEmoji?: string;

  @Column()
  position: number;

  @Column()
  permissions: string;

  @Column()
  managed: boolean;

  @Column()
  mentionable: boolean;
}
