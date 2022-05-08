import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EndpointService {
  private url: string;

  constructor(private httpClient: HttpClient) {
      this.url = environment.apiUrl;
  }

  post<T>(endpoint: string, data: any): Observable<T> {
    const url = `${this.url}${endpoint}`;
    return this.httpClient.post<T>(url, data).pipe(
        catchError(error => {
            throw new Error(error);
        })
    );
}

get<T>(endpoint: string) {
    const url = `${this.url}${endpoint}`;
    return this.httpClient.get<T>(url).pipe(
        catchError(error => {
            throw new Error(error);
        })
    );
}

put<T>(endpoint: string, data: any): Observable<T> {
    const url = `${this.url}${endpoint}`;
    return this.httpClient.put<T>(url, data).pipe(
        catchError(error => {
            throw new Error(error);
        })
    );
}

delete<T>(endpoint: string) {
    const url = `${this.url}${endpoint}`;
    return this.httpClient.delete<T>(url).pipe(
        catchError(error => {
            throw new Error(error);
        })
    );
}
}
