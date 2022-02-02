import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ROUTES, SERVICES } from 'src/utils/constants';
import { WebSockectHandler } from 'src/websocket/socket';
import { IGuildService } from '../interfaces/guilds';
@Controller(ROUTES.GUILDS)
export class GuildsController {
  constructor(
    @Inject(SERVICES.GUILDS) private readonly guildsService: IGuildService,
    @Inject(WebSockectHandler) private readonly wsHandler: WebSockectHandler,
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
    const config = await this.guildsService.updateGuildPrefix(guildId, prefix);
    this.wsHandler.guildPrefixUpdate(config);
    return config;
  }

  @Post(':guildId/config/welcome')
  async updateWelcomeChannel(
    @Param('guildId') guildId: string,
    @Body('channelId') channelId: string,
  ) {
    return this.guildsService.updateWelcomeChannel(guildId, channelId);
  }

  @Get(':guildId/logs')
  async getGuildLogs(
    @Param('guildId') guildId: string,
    @Query('fromDate') fromDate: Date,
  ) {
    return this.guildsService.getGuildLogs(guildId, fromDate);
  }

  @Get(':guildId/stats')
  async getGuildStats(
    @Param('guildId') guildId: string,
    @Query('fromDate') fromDate: Date,
  ) {
    return this.guildsService.getGuildStats(guildId, fromDate);
  }

  @Get(':guildId/members')
  getMembers(@Param('guildId') guildId: string) {
    return this.guildsService.getMembers(guildId);
  }
}
