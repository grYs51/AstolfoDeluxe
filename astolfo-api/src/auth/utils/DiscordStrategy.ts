import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, Profile } from 'passport-discord'
import { AuthService } from '../service/auth.service'

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy) {
    constructor(
        private auth: AuthService
    ) {
        super({
            clientID: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_ID,
            callbackURL: process.env.DISCORD_REDIRECT_URL,
            scope: ['identify', 'email', 'guilds']
        })
    }

    async validate(accesToken: string, refreshToken: string, profile: Profile) {
        console.log('DiscordStrategy Validate Method');
        console.log(profile.username)
    }
}