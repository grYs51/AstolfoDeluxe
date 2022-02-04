import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs';
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
