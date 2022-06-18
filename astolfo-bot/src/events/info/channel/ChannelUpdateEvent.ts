// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-channelUpdate
import { DMChannel, TextChannel, VoiceChannel } from 'discord.js';
import BaseEvent from '../../../utils/structures/BaseEvent';
import DiscordClient from '../../../client/client';
import {  Repository } from 'typeorm';
import { Channel } from '../../../typeOrm/entities/Channel';
import AppdataSource from '../../..';
import ChannelDto from '../../../utils/dtos/channelDto';

export default class ChannelUpdateEvent extends BaseEvent {
  constructor(
    private readonly channelInfoRepository: Repository<Channel> = AppdataSource.getRepository(
      Channel,
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
      if (oldChannel.type === 'GUILD_TEXT' || oldChannel.type === 'GUILD_VOICE') {
        this.saveChannel(newChannel as TextChannel | VoiceChannel);
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
