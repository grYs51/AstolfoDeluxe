// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-channelCreate
import { DMChannel, GuildChannel, TextChannel, VoiceChannel } from 'discord.js';
import BaseEvent from '../../../utils/structures/BaseEvent';
import DiscordClient from '../../../client/client';
import { Repository } from 'typeorm';
import { Channel } from '../../../typeOrm/entities/Channel';
import AppdataSource from '../../..';
import ChannelDto from '../../../utils/dtos/channelDto';

export default class ChannelCreateEvent extends BaseEvent {
  constructor(
    private readonly channelInfoRepository: Repository<Channel> = AppdataSource.getRepository(
      Channel,
    ),
  ) {
    super('channelCreate');
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
    const channelDb = new ChannelDto(channel);
    await this.channelInfoRepository.save(channelDb);
  }
}
