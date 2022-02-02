import { Controller, Get } from '@nestjs/common';
import { ROUTES } from 'src/utils/constants';

@Controller(ROUTES.USER)
export class UsersControler {
  constructor() {}

  @Get()
  async getUsers() {}
}
