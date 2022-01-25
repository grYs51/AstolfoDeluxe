import axios, { AxiosRequestConfig } from "axios";
import { User } from "./types";

const CONFIG: AxiosRequestConfig = { withCredentials: true };

export const getAuthStatus = () =>
    axios.get<User>('http://localhost:3001/api/auth/status', CONFIG);