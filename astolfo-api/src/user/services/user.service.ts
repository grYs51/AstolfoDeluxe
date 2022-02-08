import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/utils/typeorm/entities/User';
import { UpdateUserDetails, UserDetails } from 'src/utils/types';
import { Repository } from 'typeorm';
import { IUserService } from '../interfaces/user';

@Injectable()
export default class UserService implements IUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  createUser(details: UserDetails) {
    console.log('Create User');
    const newUser = this.userRepository.create(details);
    return this.userRepository.save(newUser);
  }

  findUser(discordId: string) {
    console.log('Find User');
    return this.userRepository.findOne({ discordId });
  }

  updateUser(user: User, details: UpdateUserDetails): Promise<User> {
    return this.userRepository.save({
      ...user,
      ...details,
    });
  }
}
