import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true, name: 'discord_id' })
  discordId: string;

  @Column({ name: 'access_Token' })
  accesToken: string;

  @Column({ name: 'refresh_Token' })
  refreshToken: string;

  @Column()
  username: string;

  @Column()
  discriminator: string;
}
