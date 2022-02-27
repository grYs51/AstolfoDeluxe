import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import RoleInfo from './RoleInfo';

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
  @JoinTable({ name: 'member_role_relation' })
  roles: RoleInfo[];

  @Column({ name: 'is_deleted', default: false })
  isDeleted?: Boolean;
}
