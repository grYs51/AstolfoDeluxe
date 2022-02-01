// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildDelete
import { Guild } from "discord.js";
import BaseEvent from "../../../utils/structures/BaseEvent";
import DiscordClient from "../../../client/client";
import { Repository, getRepository } from "typeorm";
import { GuildInfo } from "../../../typeOrm/entities/GuildInfo";

export default class GuildDeleteEvent extends BaseEvent {
  constructor(
    private readonly guildInfoRepository: Repository<GuildInfo> = getRepository(
      GuildInfo
    )
  ) {
    super("guildDelete");
  }

  async run(client: DiscordClient, guild: Guild) {
    console.log(`Deleted ${guild.name}`);
  }
}
