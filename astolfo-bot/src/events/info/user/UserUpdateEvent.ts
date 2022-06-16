// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-userUpdate
import { User } from 'discord.js';
import BaseEvent from '../../../utils/structures/BaseEvent';
import DiscordClient from '../../../client/client';
import { Repository } from 'typeorm';
import { UserInfo } from '../../../typeOrm/entities/User';
import AppdataSource from '../../..';
import UserDto from '../../../utils/dtos/userDto';

export default class UserUpdateEvent extends BaseEvent {
  constructor(
    private readonly userInfoRepository: Repository<UserInfo> = AppdataSource.getRepository(
      UserInfo,
    ),
  ) {
    super('userUpdate');
  }

  async run(client: DiscordClient, oldUser: User, newUser: User) {
    try {
      console.log(`User: ${newUser.username} updated`);
      const searchedUser = await this.userInfoRepository.findOneBy({
        id: oldUser.id,
      });

      if (!searchedUser) return;

      const user = new UserDto(newUser);
      await this.userInfoRepository.save({
        ...searchedUser,
        ...user,
      });
    } catch (e: any) {
      console.log(e);
    }
  }
}
