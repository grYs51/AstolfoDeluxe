import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';
import RoleInfo from './RoleInfo';

@Entity({ name: 'guild_info' })
export class GuildInfo {
  @PrimaryColumn({ name: 'guild_id' })
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => RoleInfo, (role) => role.guildId, { eager: true })
  @JoinColumn()
  roles: RoleInfo[];

  @Column({ name: 'is_deleted', default: false })
  isDeleted?: Boolean;
}
