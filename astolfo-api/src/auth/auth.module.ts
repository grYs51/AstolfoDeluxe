import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { SERVICES } from 'src/utils/constants';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { DiscordStrategy } from './utils/DiscordStrategy';
import { SessionSerializer } from './utils/SessionSerializer';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [
    DiscordStrategy,
    SessionSerializer,
    {
      provide: SERVICES.AUTH,
      useClass: AuthService,
    },
  ],
})
export class AuthModule {}
