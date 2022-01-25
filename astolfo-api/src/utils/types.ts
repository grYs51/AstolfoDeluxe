import { User } from "./typeorm/entities/User";

export type UserDetails = {
    discordId: string;
    accesToken: string;
    refreshToken: string;
    username: string;
    discriminator: string;
}

export type UpdateUserDetails = {
    accesToken: string;
    refreshToken: string;
    username: string;
    discriminator: string;
}

export type Done = (err: Error, user: User) => void;