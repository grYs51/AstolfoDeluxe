import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ROUTES, SERVICES } from 'src/utils/constants';
import { AuthUser } from 'src/utils/decorator';
import User from 'src/utils/typeorm/entities/User';
import { IDiscordService } from '../interfaces/discord';

@ApiTags(ROUTES.DISCORD)
@Controller(ROUTES.DISCORD)
export default class DiscordController {
  constructor(
    @Inject(SERVICES.DISCORD) private readonly discordService: IDiscordService,
  ) {}

  @Get('guilds')
  getMutualGuilds(@AuthUser() user: User) {
    return this.discordService.getMutualGuilds(user.accesToken, user.discordId);
  }

  @Get('guilds/:guildId/channels/:type')
  async getGuildChannels(
    @Param('guildId') guildId: string,
    @Param('type') type: string,
  ) {
    const { data } = await this.discordService.getGuildChannels(guildId);
    return data.filter((channel) => channel.type === parseInt(type, 10));
  }

  @Get('guilds/:guildId/roles/')
  async getGuildRoles(@Param('guildId') guildId: string) {
    const { data } = await this.discordService.getGuildRoles(guildId);
    return data;
  }
}
