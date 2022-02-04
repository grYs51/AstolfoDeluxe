import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, catchError, of, observable } from 'rxjs';
import { ApiService } from '../services/backend/api.service';

@Injectable()
export class GetSingleItemResolver {
  constructor(private apiService: ApiService) {}

  async resolve(route: ActivatedRouteSnapshot) {
    try {
      return await this.apiService.getGuildConfig(route.params['id']);
    } catch (error) {
      console.error("Guild Doesn't exist");
      return of(null);
    }
  }
}
