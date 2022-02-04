import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { firstValueFrom, take, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RetryService {
  constructor(private http: HttpClient) {}

  async fetchData<T>(url: string, retries = 3, timeout = 0): Promise<T> {
    if (timeout !== 0 && retries > 0) {
      await firstValueFrom(timer(timeout).pipe(take(1)));
    }
    if (retries > 0) {
      return firstValueFrom(
        this.http.get<T>(url, { observe: 'response', withCredentials: true })
      )
        .then((res: HttpResponse<T>) => res.body!)
        .catch(() => this.fetchData(url, retries - 1, 300));
    } else {
      throw new Error('Something went wrong with getting data');
    }
  }
}
