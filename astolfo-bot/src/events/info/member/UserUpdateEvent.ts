// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-userUpdate
import { User } from 'discord.js';
import BaseEvent from '../../../utils/structures/BaseEvent';
import DiscordClient from '../../../client/client';
import { Repository, getRepository } from 'typeorm';
import { UserInfo } from '../../../typeOrm/entities/UserInfo';

export default class UserUpdateEvent extends BaseEvent {
  constructor(
    private readonly userInfoRepository: Repository<UserInfo> = getRepository(
      UserInfo,
    ),
  ) {
    super('userUpdate');
  }

  async run(client: DiscordClient, oldUser: User, newUser: User) {
    try {
      console.log(`User: ${newUser.username} updated`);
      const searchedUser = await this.userInfoRepository.findOne(oldUser.id);

      if (!searchedUser) return;

      const { username, discriminator } = newUser;
      const user = this.userInfoRepository.create({
        ...searchedUser,
        name: username,
        avatar: newUser.avatar ? newUser.avatarURL()! : undefined,
        discriminator,
      });
      await this.userInfoRepository.save(user);
    } catch (e: any) {
      console.log(e.message);
    }
  }
}
