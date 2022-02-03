import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { ApiService } from '../services/backend/api.service';
import { IDiscordUser } from '../Types';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user$: IDiscordUser | undefined;
  constructor(private router: Router, private api: ApiService) {}

  async initCallUser() {
    if (this.user$) return this.user$;
    try {
      return await this.api.auth();
    } catch (error) {
      return undefined;
    }
  }
}
