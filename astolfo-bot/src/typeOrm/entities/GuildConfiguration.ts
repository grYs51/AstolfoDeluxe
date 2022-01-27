import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "guild_configuration" })
export class GuildConfiguration {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ unique: true, name: "guild_id" })
  guildId: string;

  @Column({ default: "," })
  prefix: string;

  @Column({ name: "welcome_channel_id", nullable: true })
  welcomeChannelId: string;
}
