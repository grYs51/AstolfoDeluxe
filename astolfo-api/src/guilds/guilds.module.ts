import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SERVICES } from 'src/utils/constants';
import { GuildConfiguration } from 'src/utils/typeorm/entities/GuildConfiguration';
import { WebSocketModule } from 'src/websocket/websocket.module';
import { GuildsController } from './controllers/guilds.controller';
import { GuildService } from './services/guilds.service';

@Module({
  imports: [TypeOrmModule.forFeature([GuildConfiguration]), WebSocketModule],
  controllers: [GuildsController],
  providers: [
    {
      provide: SERVICES.GUILDS,
      useClass: GuildService,
    },
  ],
})
export class GuildsModule {}
