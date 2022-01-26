import { Injectable } from "@nestjs/common";
import { IDiscordHttpService } from "../interfaces/discord-http";
import axios from "axios";

@Injectable()
export class DiscordHttpService implements IDiscordHttpService {
    fetchBotGuilds() {
        const TOKEN = process.env.DISCORD_BOT_TOKEN;
        return axios.get('https://discord.com/api/v9/users/@me/guilds', {
            headers: {
                Authorization: `Bot ${TOKEN}`,
            },
        });
    }
    fetchUserGuilds(accesToken: string) {
        return axios.get('https://discord.com/api/v9/users/@me/guilds', {
            headers: {
                Authorization: `Bearer ${accesToken}`,
            },
        });
    }

}