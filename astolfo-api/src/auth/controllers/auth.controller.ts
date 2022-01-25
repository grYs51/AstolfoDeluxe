import { Controller, Get, Post } from '@nestjs/common';
import { ROUTES } from 'src/utils/constants';

@Controller(ROUTES.AUTH)
export class AuthController {

    @Get('login')
    login() { }

    @Get('redirect')
    redirect() { }

    @Get('status')
    status() { }

    @Post('logout')
    logout() { }

}
