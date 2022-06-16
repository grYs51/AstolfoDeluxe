import { Message, TextChannel, ThreadChannel, VoiceChannel } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import process from 'process';
import {  Repository } from 'typeorm';
import { Channel } from '../../typeOrm/entities/Channel';
import AppdataSource from '../..';
import GuildDto from '../../utils/dtos/guildDto';
import ChannelDto from '../../utils/dtos/channelDto';

export default class InitChannels extends BaseCommand {
  constructor(
    private readonly channelRepository: Repository<Channel> = AppdataSource.getRepository(
      Channel,
    ),
  ) {
    super('channels', 'testing', []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (message.author.id != process.env.OWNER) {
      message.react('⛔');
      return;
    }

    const date = new Date().getTime();
    try {
      let total = 0;
      for (const channel of client.channels.cache) {
        const channel1 = channel[1];
        if (channel1.isText() || channel1.isVoice() || channel1.isThread()) {
          total++;
          this.saveChannel(channel1 as TextChannel | VoiceChannel);
        }
      }
      const content = `Took me ${
        (new Date().getTime() - date) / 1000
      }s for ${total} channels!`;
      message.react('✅');
      message.reply({
        content,
        allowedMentions: {
          repliedUser: false,
        },
      });
    } catch (e) {
      console.log(e);
      message.react('❌');
      return;
    }

    message.react('✅');
    return;
  }

  private async saveChannel(channel: TextChannel | VoiceChannel) {
    const channelDto = new ChannelDto(channel);
    await this.channelRepository.save(channelDto);
  }
}
