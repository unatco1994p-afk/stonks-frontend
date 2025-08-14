import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import { jwtDecode } from 'jwt-decode';


interface JwtUserToken {
    uid: string;
    roles: string[];
    email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    private api = inject(ApiService);

    private apiUrl = this.api.baseUrl;

    constructor(private http: HttpClient) { }

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

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    getDecodedToken(): JwtUserToken | null {
        const token = this.getToken();
        if (!token) return null;
        try {
            return jwtDecode<JwtUserToken>(token);
        } catch (e) {
            console.error('Invalid token', e);
            return null;
        }
    }

    getRoles(): string[] {
        const decoded = this.getDecodedToken();
        return decoded?.roles ?? [];
    }

    hasRole(role: string): boolean {
        return this.getRoles().includes(role);
    }
}
