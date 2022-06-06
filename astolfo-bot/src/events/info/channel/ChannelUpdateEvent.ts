// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-channelUpdate
import { DMChannel, TextChannel, VoiceChannel } from 'discord.js';
import BaseEvent from '../../../utils/structures/BaseEvent';
import DiscordClient from '../../../client/client';
import { getRepository, Repository } from 'typeorm';
import { ChannelInfo } from '../../../typeOrm/entities/ChannelInfo';

export default class ChannelUpdateEvent extends BaseEvent {
  constructor(
    private readonly channelInfoRepository: Repository<ChannelInfo> = getRepository(
      ChannelInfo,
    ),
  ) {
    super('channelUpdate');
  }

  async run(
    client: DiscordClient,
    oldChannel: DMChannel | TextChannel | VoiceChannel,
    newChannel: DMChannel | TextChannel | VoiceChannel,
  ) {
    try {
      if (!oldChannel.isThread()) {
        this.saveChannel(newChannel as TextChannel | VoiceChannel);
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

    const channeld = this.channelInfoRepository.create({
      channelId: channel.id,
      guildId: channel.guildId,
      name: channel.name,
      nsfw,
      createdAt: channel.createdAt,
      position: channel.rawPosition,
      type: channel.type,
      topic,
    });
    await this.channelInfoRepository.save(channeld);
  }
}
