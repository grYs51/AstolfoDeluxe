import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IDiscordUser } from '../../Types';
import { RetryService } from '../../utils/Retry';

const API_URL = 'http://localhost:3001/api/';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private retrySrv: RetryService) {}

  public auth() {
    return this.retrySrv.fetchData<IDiscordUser>(`${API_URL}auth/status`);
  }
}
