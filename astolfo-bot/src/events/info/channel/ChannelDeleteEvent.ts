// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-channelDelete
import { GuildChannel } from 'discord.js';
import BaseEvent from '../../../utils/structures/BaseEvent';
import DiscordClient from '../../../client/client';
import { Repository } from 'typeorm';
import { ChannelInfo } from '../../../typeOrm/entities/ChannelInfo';
import AppdataSource from '../../..';

export default class ChannelDeleteEvent extends BaseEvent {
  constructor(
    private readonly channelInfoRepository: Repository<ChannelInfo> = AppdataSource.getRepository(
      ChannelInfo,
    ),
  ) {
    super('channelDelete');
  }

  // async run(client: DiscordClient, channel: DMChannel | GuildChannel)
  async run(client: DiscordClient, channel: GuildChannel) {
    console.log(`Removed Channel: ${channel.name}`);
    const channelDb = await this.channelInfoRepository.findOneBy({
      channelId: channel.id,
    });
    if (!channelDb) return;
    await this.channelInfoRepository.save({ ...channelDb, isDeleted: true });
  }
}
