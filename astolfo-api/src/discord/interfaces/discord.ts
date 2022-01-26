export interface IDiscordService {
    getBotGuilds();
    getUserGuilds(accesToken: string);
    getMutualGuilds(accesToken: string, userId:string);
}