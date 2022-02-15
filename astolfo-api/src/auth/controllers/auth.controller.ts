/* eslint-disable class-methods-use-this */
import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ROUTES } from 'src/utils/constants';
import { AuthUser } from 'src/utils/decorator';
import User from 'src/utils/typeorm/entities/User';
import { AuthenticatedGuard, DiscordAuthGuard } from '../utils/Guards';

@ApiTags(ROUTES.AUTH)
@Controller(ROUTES.AUTH)
export default class AuthController {
  @Get('login')
  @UseGuards(DiscordAuthGuard)
  login() {}

  @Get('redirect')
  @UseGuards(DiscordAuthGuard)
  redirect(@Res() res: Response) {
    res.redirect('http://localhost:4200/#authorized');
  }

  @Get('status')
  @UseGuards(AuthenticatedGuard)
  status(@AuthUser() user: User) {
    return user;
  }

  @Post('logout')
  logout() {}
}
