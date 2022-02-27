import { Message, User } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import process from 'process';
import { getRepository, Repository } from 'typeorm';
import { UserInfo } from '../../typeOrm/entities/UserInfo';
export default class InitUsers extends BaseCommand {
  constructor(
    private readonly userInfoRepository: Repository<UserInfo> = getRepository(
      UserInfo,
    ),
  ) {
    super('users', 'testing', []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (message.author.id != process.env.OWNER) {
      message.react('⛔');
      return;
    }
    const date = new Date().getTime();
    try {
      for await (const user of client.users.cache) {
        await this.save(user[1]);
      }
      const content = `Took me ${(new Date().getTime() - date) / 1000}s for ${
        client.users.cache.size
      } users!`;
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
    return;
  }

  private async save(user: User) {
    const { id, username, discriminator, bot, createdAt } = user;
    user.avatar;
    try {
      await this.saveMember(
        id,
        username,
        discriminator,
        user.avatar,
        bot,
        createdAt!,
      );
    } catch (error) {
      console.log(error);
    }
  }

  async saveMember(
    id: string,
    name: string,
    discriminator: string,
    avatar: string | null,
    bot: boolean,
    createdAt: Date,
  ) {
    const user = this.userInfoRepository.create({
      id,
      name,
      discriminator,
      avatar: avatar || undefined,
      bot,
      createdAt,
    });
    await this.userInfoRepository.save(user);
  }
}
