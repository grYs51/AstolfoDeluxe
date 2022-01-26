import { User } from 'src/utils/typeorm/entities/User';
import { UpdateUserDetails, UserDetails } from 'src/utils/types';

export interface IUserService {
  createUser(details: UserDetails): Promise<User>;
  findUser(discordId: string): Promise<User> | undefined;
  updateUser(user: User, details: UpdateUserDetails): Promise<User>;
}
