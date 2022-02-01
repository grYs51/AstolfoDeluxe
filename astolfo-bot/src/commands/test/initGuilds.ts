import { Message } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
import process from "process";
import { getRepository, Repository } from "typeorm";
import { GuildInfo } from "../../typeOrm/entities/GuildInfo";

export default class InitGuilds extends BaseCommand {
  constructor(
    private readonly guildInfoRepository: Repository<GuildInfo> = getRepository(
      GuildInfo
    )
  ) {
    super("guilds", "testing", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (message.author.id != process.env.OWNER) {
      message.react("⛔");
      return;
    }

    try {
      client.guilds.cache.forEach(async (guild) => {
        const guildInfo = this.guildInfoRepository.create({
          guildId: guild.id,
          name: guild.name,
          createdAt: guild.createdAt,
          icon: guild.iconURL() ? guild.iconURL()! : undefined,
        });
        await this.guildInfoRepository.save(guildInfo);
      });
    } catch (e) {
      message.react("❌");
      return;
    }

    message.react("✅");
    return;
  }
}
