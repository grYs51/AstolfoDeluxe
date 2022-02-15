import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SERVICES } from 'src/utils/constants';
import GuildInfo from 'src/utils/typeorm/entities/GuildInfo';
import DiscordController from './controllers/discord.controller';
import DiscordHttpService from './services/discord-http.service';
import DiscordService from './services/discord.service';

@Module({
  imports: [TypeOrmModule.forFeature([GuildInfo])],
  controllers: [DiscordController],
  providers: [
    {
      provide: SERVICES.DISCORD,
      useClass: DiscordService,
    },
    {
      provide: SERVICES.DISCORD_HTTP,
      useClass: DiscordHttpService,
    },
  ],
})
export default class DiscordModule {}
