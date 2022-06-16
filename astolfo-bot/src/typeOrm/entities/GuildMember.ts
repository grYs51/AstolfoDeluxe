import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm';
import { Guild } from './Guild';
import Role from './Role';
import { UserInfo } from './User';

@Entity({ name: 'guild_member_info' })
export class GuildMember {
  @PrimaryColumn({ name: 'member_id' })
  id: string;

  @ManyToOne(() => UserInfo, { eager: true })
  @JoinColumn()
  user: UserInfo;

  @ManyToOne(() => Guild, (guild) => guild.id, { eager: true, })
  @JoinColumn()
  guild: Guild;

  @Column({ name: 'guild_member_name' })
  guildName: string;

  @Column({ name: 'guild_avatar', nullable: true })
  guildAvatar?: string;

  @Column({ name: 'guild_color', nullable: true })
  guildColor?: string;

  @Column({ name: 'joined_at', nullable: true })
  joinedAt?: Date;

  // @Column({ name: 'guild_info' })
  // guild: string;

  // @Column({ name: 'user_info' })
  // user: string;

  @ManyToMany(() => Role)
  @JoinTable({ name: 'member_role_relation' })
  roles: Role[];

  @Column({ name: 'is_deleted', default: false })
  isDeleted?: Boolean;
}
