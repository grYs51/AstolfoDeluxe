import { Inject, Injectable } from "@nestjs/common";
import { SERVICES } from "src/utils/constants";
import { IDiscordService } from "../interfaces/discord";
import { IDiscordHttpService } from "../interfaces/discord-http";

@Injectable()
export class DiscordService implements IDiscordService {
    constructor(@Inject(SERVICES.DISCORD_HTTP)
    private readonly discorHttpService:
        IDiscordHttpService) { }

    getBotGuilds() {
        return this.discorHttpService.fetchBotGuilds();
    }
    getUserGuilds(accesToken: string) {
        return this.discorHttpService.fetchUserGuilds(accesToken);
    }
    async getMutualGuilds(accesToken: string) {
        const { data: UserGuilds } = await this.getUserGuilds(accesToken);
        const { data: BotGuilds } = await this.getBotGuilds();

        return {UserGuilds, BotGuilds}
    }

}