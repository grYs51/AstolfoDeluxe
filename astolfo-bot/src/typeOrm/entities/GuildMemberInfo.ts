import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GuildInfo } from './GuildInfo';
import RoleInfo from './RoleInfo';
import { UserInfo } from './UserInfo';

@Entity({ name: 'guild_member_info' })
export class GuildMemberInfo {
  @PrimaryColumn({ name: 'member_id' })
  memberId: string;

  @Column({ name: 'guild_member_name' })
  guildName: string;

  @Column({ name: 'guild_avatar', nullable: true })
  guildAvatar: string;

  @Column({ name: 'guild_color', nullable: true })
  guildColor: string;

  @Column({ name: 'joined_at' })
  joinedAt: Date;

  @Column({ name: 'guild_info' })
  guild: string;

  @Column({ name: 'user_info' })
  user: string;

  @ManyToMany(() => RoleInfo)
  @JoinTable({name: 'member_role_relation'})
  roles: RoleInfo[];
}
