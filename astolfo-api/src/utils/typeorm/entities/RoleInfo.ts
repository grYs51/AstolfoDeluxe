/* eslint-disable import/no-cycle */
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import GuildInfo from './GuildInfo';
import GuildMemberInfo from './GuildMemberInfo';

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

  @ManyToOne(() => GuildInfo, (guild) => guild.roles, { eager: false })
  @JoinColumn({ name: 'guild_id' })
  guild: GuildInfo;

  @ManyToMany(() => GuildMemberInfo, (guildMember) => guildMember.roles, {
    eager: false,
    cascade: true,
  })
  guildMember: GuildMemberInfo[];

  @Column({ name: 'is_deleted', default: false })
  isDeleted?: Boolean;
}
