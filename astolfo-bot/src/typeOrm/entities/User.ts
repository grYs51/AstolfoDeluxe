import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'user_info' })
export class UserInfo {
  @PrimaryColumn({ name: 'id' })
  id: string;

  @Column()
  name: string;

  @Column()
  discriminator: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column()
  bot: boolean;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'is_deleted', default: false })
  isDeleted?: Boolean;
}
