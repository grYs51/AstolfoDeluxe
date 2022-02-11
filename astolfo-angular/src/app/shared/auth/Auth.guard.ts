import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { AuthService } from './Auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private auth: AuthService,
    private router: Router,
    private userSrv: UserService
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree | Observable<boolean | UrlTree>> {
    const user = await this.auth.initCallUser();
    if (user) {
      this.userSrv.user = user;
      return true;
    } else {
      console.log('not logged in');
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
