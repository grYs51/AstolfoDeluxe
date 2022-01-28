import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SERVICES } from 'src/utils/constants';
import { GuildBanLog } from 'src/utils/typeorm/entities/GuildBanLog';
import { GuildConfiguration } from 'src/utils/typeorm/entities/GuildConfiguration';
import { ModerationLog } from 'src/utils/typeorm/entities/ModerationLog';
import { WebSocketModule } from 'src/websocket/websocket.module';
import { GuildsController } from './controllers/guilds.controller';
import { GuildService } from './services/guilds.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([GuildConfiguration, GuildBanLog, ModerationLog]),
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
export class GuildsModule {}
