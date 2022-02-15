import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'channel_info' })
export default class ChannelInfo {
  @PrimaryColumn({ name: 'channel_id' })
  channelId: string;

  @Column({ name: 'guild_id' })
  guildId: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  nsfw: boolean;

  @Column()
  type: string;

  @Column({ nullable: true })
  position: number;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ nullable: true })
  topic?: string;
}
