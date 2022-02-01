import { Message, TextChannel, ThreadChannel, VoiceChannel } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
import process from "process";
import { getRepository, Repository } from "typeorm";
import { ChannelInfo } from "../../typeOrm/entities/ChannelInfo";

export default class InitChannels extends BaseCommand {
  constructor(
    private readonly guildInfoRepository: Repository<ChannelInfo> = getRepository(
      ChannelInfo
    )
  ) {
    super("channel", "testing", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (message.author.id != process.env.OWNER) {
      message.react("⛔");
      return;
    }

    try {
      client.channels.cache.forEach((channel) => {
        if (channel.isText() || channel.isVoice() || channel.isThread()) {
          this.saveChannel(channel as TextChannel | VoiceChannel);
        }
      });
    } catch (e) {
      console.log(e);
      message.react("❌");
      return;
    }

    message.react("✅");
    return;
  }

  private async saveChannel(channel: TextChannel | VoiceChannel) {
    let topic: string | undefined;
    let nsfw: boolean | undefined;
    if (channel.isText()) {
      topic = channel.topic!;
      nsfw = channel.nsfw!;
    }

    const channeld = this.guildInfoRepository.create({
      channelId: channel.id,
      guildId: channel.guildId,
      name: channel.name,
      nsfw,
      createdAt: channel.createdAt,
      position: channel.rawPosition,
      type: channel.type,
      topic,
    });
    await this.guildInfoRepository.save(channeld);
  }
}
