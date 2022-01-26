import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-discord';
import { SERVICES } from 'src/utils/constants';
import { IAuthService } from '../interfaces/auth';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(SERVICES.AUTH)
    private readonly authService: IAuthService,
  ) {
    super({
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: process.env.DISCORD_REDIRECT_URL,
      scope: ['identify', 'email', 'guilds'],
    });
  }

  async validate(accesToken: string, refreshToken: string, profile: Profile) {
    console.log('DiscordStrategy Validate Method');
    return this.authService.validateUser({
      discordId: profile.id,
      username: profile.username,
      discriminator: profile.discriminator,
      accesToken,
      refreshToken,
    });
  }
}
