import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
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

  @Post(':guildId/config/prefix')
  async updateGuildPrefix(
    @Param('guildId') guildId: string,
    @Body('prefix') prefix: string,
  ) {
    return this.guildsService.updateGuildPrefix(guildId, prefix);
  }

  @Post(':guildId/config/welcome')
  async updateWelcomeChannel(
    @Param('guildId') guildId: string,
    @Body('channelId') channelId: string,
  ) {
    return this.guildsService.updateWelcomeChannel(guildId, channelId);
  }
}
