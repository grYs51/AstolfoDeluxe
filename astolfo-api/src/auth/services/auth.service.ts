import { Inject, Injectable } from '@nestjs/common';
import { IUserService } from 'src/user/interfaces/user';
import { SERVICES } from 'src/utils/constants';
import { UserDetails } from 'src/utils/types';
import { IAuthService } from '../interfaces/auth';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(SERVICES.USER) private readonly userService: IUserService,
  ) {}

  async validateUser(details: UserDetails) {
    const user = await this.userService.findUser(details.discordId);
    const { discordId, ...updatedDetails } = details;
    return user
      ? this.userService.updateUser(user, updatedDetails)
      : this.userService.createUser(details);
  }
}
