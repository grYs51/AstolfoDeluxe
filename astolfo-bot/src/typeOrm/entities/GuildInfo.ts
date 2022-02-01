import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "guild_info" })
export class GuildInfo {
  @PrimaryColumn({ name: "guild_id" })
  guildId: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ name: "created_at" })
  createdAt: Date;
}
