import { Injectable } from '@angular/core';
import { IDiscordUser } from '../Types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: IDiscordUser | null = null;
}
