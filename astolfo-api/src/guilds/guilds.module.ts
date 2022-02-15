import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SERVICES } from 'src/utils/constants';
import GuildConfiguration from 'src/utils/typeorm/entities/GuildConfiguration';
import GuildInfo from 'src/utils/typeorm/entities/GuildInfo';
import GuildMemberInfo from 'src/utils/typeorm/entities/GuildMemberInfo';
import GuildStatsLog from 'src/utils/typeorm/entities/GuildStatsLog';
import ModerationLog from 'src/utils/typeorm/entities/ModerationLog';
import WebSocketModule from 'src/websocket/websocket.module';
import GuildsController from './controllers/guilds.controller';
import GuildService from './services/guilds.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      GuildConfiguration,
      ModerationLog,
      GuildStatsLog,
      GuildMemberInfo,
      GuildInfo,
    ]),
    WebSocketModule,
  ],
  controllers: [GuildsController],
  providers: [
    {
      provide: SERVICES.GUILDS,
      useClass: GuildService,
    },
  ],
})
export default class GuildsModule {}
