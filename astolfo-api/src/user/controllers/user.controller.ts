import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ROUTES } from 'src/utils/constants';

@ApiTags(ROUTES.USER)
@Controller(ROUTES.USER)
export default class UsersControler {}
