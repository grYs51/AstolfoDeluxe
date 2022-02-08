// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberAdd
import { GuildMember, TextChannel } from 'discord.js';
import BaseEvent from '../../utils/structures/BaseEvent';
import DiscordClient from '../../client/client';

export default class GuildMemberAddEvent extends BaseEvent {
  constructor() {
    super('guildMemberAdd');
  }

  async run(client: DiscordClient, member: GuildMember) {
    const config = client.configs.get(member.guild.id);
    if (config) {
      if (config.welcomeChannelId) {
        const channel = member.guild.channels.cache.get(
          config.welcomeChannelId,
        ) as TextChannel;
        if (!channel) {
          console.log('No welcome channel found');
        } else {
          channel.send(`Welcome ${member}`);
        }
      } else {
        console.log('No welcome channel set.');
      }
    }
  }
}
