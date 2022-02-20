import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SERVICES } from 'src/utils/constants';
import ChannelInfo from 'src/utils/typeorm/entities/ChannelInfo';
import GuildConfiguration from 'src/utils/typeorm/entities/GuildConfiguration';
import GuildInfo from 'src/utils/typeorm/entities/GuildInfo';
import GuildMemberInfo from 'src/utils/typeorm/entities/GuildMemberInfo';
import GuildStatsLog from 'src/utils/typeorm/entities/GuildStatsLog';
import RoleInfo from 'src/utils/typeorm/entities/RoleInfo';
import WebSocketModule from 'src/websocket/websocket.module';
import GuildsController from './controllers/guilds.controller';
import GuildService from './services/guilds.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      GuildConfiguration,
      GuildStatsLog,
      GuildMemberInfo,
      GuildInfo,
      ChannelInfo,
      RoleInfo,
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
