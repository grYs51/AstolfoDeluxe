import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'role_info' })
export default class RoleInfo {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  color: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column()
  hoist: boolean;

  @Column({ nullable: true })
  icon?: string;

  @Column({ name: 'unicode_emoji', nullable: true })
  unicodeEmoji?: string;

  @Column()
  position: number;

  @Column()
  managed: boolean;

  @Column()
  mentionable: boolean;

  @Column({ name: 'guild_id' })
  guildId: string;

  @Column({ name: 'is_deleted', default: false })
  isDeleted?: Boolean;
}
