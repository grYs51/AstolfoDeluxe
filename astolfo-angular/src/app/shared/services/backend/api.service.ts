import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDiscordUser } from '../../Types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private API_URL = "http://localhost:3001/api";

  private httpOptions = {
    withCredentials: true
  };

  constructor(private http: HttpClient) { }

  public auth() {
    return this.http.get<IDiscordUser>(`${this.API_URL}/auth/status`, this.httpOptions)
  }
}
