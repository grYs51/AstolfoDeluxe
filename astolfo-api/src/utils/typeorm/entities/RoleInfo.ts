/* eslint-disable import/no-cycle */
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import GuildInfo from './GuildInfo';

@Entity({ name: 'role_info' })
export default class RoleInfo {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  color: number;

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

  @ManyToOne(() => GuildInfo, (guild) => guild.roles, { eager: false })
  @JoinColumn({ name: 'guild_id' })
  guild: GuildInfo;
}
