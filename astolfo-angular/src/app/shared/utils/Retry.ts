import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { firstValueFrom, Observable, take, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RetryService {
  constructor(private http: HttpClient) {}

  private async fetchData<T>(
    callback: () => Observable<HttpResponse<T>>,
    retries: number,
    timeout: number
  ): Promise<T> {
    if (timeout !== 0 && retries > 0) {
      await firstValueFrom(timer(timeout).pipe(take(1)));
    }
    if (retries > 0) {
      return firstValueFrom(callback())
        .then((res: HttpResponse<T>) => res.body!)
        .catch(() => this.fetchData(callback, retries - 1, 300));
    } else {
      throw new Error('Something went wrong with getting data');
    }
  }

  async getData<T>(url: string, retries = 3, timeout = 0): Promise<T> {
    return this.fetchData<T>(
      () =>
        this.http.get<T>(url, { observe: 'response', withCredentials: true }),
      retries,
      timeout
    );
  }

  async postData<T>(
    url: string,
    body: unknown,
    retries = 3,
    timeout = 0
  ): Promise<T> {
    return this.fetchData(
      () =>
        this.http.post<T>(url, body, {
          observe: 'response',
          withCredentials: true,
        }),
      retries,
      timeout
    );
  }
}
