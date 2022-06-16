import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Channel } from './Channel';
import Role from './Role';

@Entity({ name: 'guild_info' })
export class Guild {
  @PrimaryColumn({ name: 'guild_id' })
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  icon?: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @ManyToMany(() => Role, (role) => role.id, {
    onUpdate: 'RESTRICT',
  })
  @JoinTable()
  roles: Role[];

  // @ManyToOne(() => Channel, (channel) => channel.id)
  // @JoinColumn()
  // channels: Channel[];

  @Column({ name: 'is_deleted', default: false })
  isDeleted?: Boolean;
}
