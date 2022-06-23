import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Guild } from './Guild';
import Role from './Role';
import { UserInfo } from './User';

@Entity({ name: 'guild_members' })
export class GuildMember {
  @PrimaryColumn({ name: 'member_id' })
  id: string;

  // @PrimaryColumn({ name: 'user_id' })
  @ManyToOne(() => UserInfo)
  @JoinColumn({ name: 'user_id' })
  user: UserInfo;

  // @PrimaryColumn({ name: 'guild_id' })
  @ManyToOne(() => Guild)
  @JoinColumn({ name: 'guild_id' })
  guild: Guild;

  @Column({ name: 'guild_member_name' })
  guildName: string;

  @Column({ name: 'guild_avatar', nullable: true })
  guildAvatar?: string;

  @Column({ name: 'guild_color', nullable: true })
  guildColor?: string;

  @Column({ name: 'joined_at', nullable: true })
  joinedAt?: Date;

  @ManyToMany(() => Role)
  @JoinTable({ name: 'member_role_relation' })
  roles: Role[];

  @Column({ name: 'is_deleted', default: false })
  isDeleted?: Boolean;
}
