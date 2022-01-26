import axios, { AxiosRequestConfig } from "axios";
import { PartialGuild, User } from "./types";

const CONFIG: AxiosRequestConfig = { withCredentials: true };

export const getAuthStatus = () =>
    axios.get<User>('http://localhost:3001/api/auth/status', CONFIG);

export const getMutualGuilds = () =>
    axios.get<PartialGuild[]>('http://localhost:3001/api/discord/guilds', CONFIG);