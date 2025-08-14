import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

declare global {
  interface Window { __env?: { backendUrl?: string } }
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public get baseUrl(): string {
    return window.__env?.backendUrl || 'http://localhost:8080';
  }

  constructor(private http: HttpClient) {}

  getLogs(): Observable<any> {
    return this.http.get(`${this.baseUrl}/logs`);
  }

  addLog(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/logs`, data);
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin-users/users`);
  }
}
