export interface IDiscordHttpService {
    fetchBotGuilds();
    fetchUserGuilds(accesToken: string);
}