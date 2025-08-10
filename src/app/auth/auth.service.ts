import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ApiService } from '../services/api.service';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = inject(ApiService);
  
  private apiUrl = this.api.baseUrl;

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap(res => {
          localStorage.setItem('token', res.token);
        })
      );
  }

  register(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/auth/register`, { email, password });
  }

  logout() {
    localStorage.removeItem('token');
  }
}
