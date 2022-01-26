import { User } from 'src/utils/typeorm/entities/User';
import { UserDetails } from 'src/utils/types';

export interface IAuthService {
  validateUser(details: UserDetails): Promise<User>;
}
