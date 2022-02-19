/* eslint-disable import/no-cycle */
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import GuildInfo from './GuildInfo';
import RoleInfo from './RoleInfo';
import UserInfo from './UserInfo';

@Entity({ name: 'guild_member_info' })
export default class GuildMemberInfo {
  // @PrimaryGeneratedColumn('uuid')
  // id: string;

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

  @ManyToOne(() => GuildInfo, (guild) => guild.id)
  @JoinColumn({ name: 'guild_info' })
  guild: GuildInfo;

  @ManyToOne(() => UserInfo, (user) => user.id)
  @JoinColumn({ name: 'user_info' })
  user: UserInfo;

  @ManyToMany(() => RoleInfo, {
    eager: true,
  })
  @JoinTable({ name: 'member_role_relation' })
  roles: RoleInfo[];
}
