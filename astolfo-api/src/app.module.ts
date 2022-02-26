import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { configValidationSchema } from './config.schema';
import { entities } from './utils/typeorm';
import AuthModule from './auth/auth.module';
import UserModule from './user/user.module';
import DiscordModule from './discord/discord.module';
import GuildsModule from './guilds/guilds.module';
import WebSocketModule from './websocket/websocket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    PassportModule.register({ session: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        autoLoadEntities: true,
        // logging: true,
        synchronize: process.env.STAGE === 'dev',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities,
      }),
    }),
    AuthModule,
    UserModule,
    DiscordModule,
    GuildsModule,
    WebSocketModule,
  ],
  controllers: [],
  providers: [],
})
export default class AppModule {}
