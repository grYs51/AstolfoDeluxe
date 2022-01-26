import { Controller, Get, Inject } from "@nestjs/common";
import { ROUTES, SERVICES } from "src/utils/constants";
import { AuthUser } from "src/utils/decorator";
import { User } from "src/utils/typeorm/entities/User";
import { IDiscordService } from "../interfaces/discord";

@Controller(ROUTES.DISCORD)
export class DiscordController {
    constructor(@Inject(SERVICES.DISCORD) private readonly discordService: IDiscordService) { }

    @Get('guilds')
    getMutualGuilds(@AuthUser() user : User) {
        return this.discordService.getMutualGuilds(user.accesToken);
    }

}