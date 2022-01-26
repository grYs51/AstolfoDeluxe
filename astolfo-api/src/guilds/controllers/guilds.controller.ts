import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ROUTES, SERVICES } from 'src/utils/constants';
import { IGuildService } from '../interfaces/guilds';

@Controller(ROUTES.GUILDS)
export class GuildsController {
  constructor(
    @Inject(SERVICES.GUILDS) private readonly guildsService: IGuildService,
  ) {}
  @Get('config/:guildId')
  getGuildConfig(@Param('guildId') guildId: string) {
    return this.guildsService.getGuildConfig(guildId);
  }
}
