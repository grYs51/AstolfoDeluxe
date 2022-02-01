// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-channelDelete
import { GuildChannel } from "discord.js";
import BaseEvent from "../../../utils/structures/BaseEvent";
import DiscordClient from "../../../client/client";
import { Repository, getRepository } from "typeorm";
import { ChannelInfo } from "../../../typeOrm/entities/ChannelInfo";

export default class ChannelDeleteEvent extends BaseEvent {
  constructor(
    private readonly channelInfoRepository: Repository<ChannelInfo> = getRepository(
      ChannelInfo
    )
  ) {
    super("channelDelete");
  }

  // async run(client: DiscordClient, channel: DMChannel | GuildChannel)
  async run(client: DiscordClient, channel: GuildChannel) {
    console.log(`Removed Channel: ${channel.name}`);
    const channelDb = await this.channelInfoRepository.findOne(channel.id);
    if (!channelDb) return;
    await this.channelInfoRepository.remove(channelDb);
  }
}
