// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-channelCreate
import { DMChannel, GuildChannel, TextChannel, VoiceChannel } from "discord.js";
import BaseEvent from "../../../utils/structures/BaseEvent";
import DiscordClient from "../../../client/client";
import { Repository, getRepository } from "typeorm";
import { ChannelInfo } from "../../../typeOrm/entities/ChannelInfo";

export default class ChannelCreateEvent extends BaseEvent {
  constructor(
    private readonly ChannelInfoRepository: Repository<ChannelInfo> = getRepository(
      ChannelInfo
    )
  ) {
    super("channelCreate");
  }

  async run(client: DiscordClient, channel: DMChannel | GuildChannel) {
    try {
      if (channel.isText() || channel.isVoice()) {
        this.saveChannel(channel as TextChannel | VoiceChannel);
      }
    } catch (e) {
      console.log(e);
    }
  }

  private async saveChannel(channel: TextChannel | VoiceChannel) {
    let topic: string | undefined;
    let nsfw: boolean | undefined;
    if (channel.isText()) {
      topic = channel.topic!;
      nsfw = channel.nsfw!;
    }

    const channeld = this.ChannelInfoRepository.create({
      channelId: channel.id,
      guildId: channel.guildId,
      name: channel.name,
      nsfw,
      createdAt: channel.createdAt,
      position: channel.rawPosition,
      type: channel.type,
      topic,
    });
    await this.ChannelInfoRepository.save(channeld);
  }
}
