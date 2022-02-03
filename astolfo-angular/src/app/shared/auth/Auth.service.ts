import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IDiscordUser } from '../Types';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user$: IDiscordUser | null;
  constructor(private router: Router) {
    try {
      this.user$ = JSON.parse(localStorage.getItem('discord_user')!);
    } catch (e) {
      this.user$ = null;
    }
  }
}
