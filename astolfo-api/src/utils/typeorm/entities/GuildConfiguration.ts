import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'guild_configuration' })
export class GuildConfiguration {

  @PrimaryColumn({ unique: true, name: 'guild_id' })
  guildId: string;

  @Column({ default: '!' })
  prefix: string;

  @Column({ name: 'welcome_channel_id', nullable: true })
  welcomeChannelId: string;

  @Column({name: 'welcome_message',length: 200})
  welcomeMessage: string
}
