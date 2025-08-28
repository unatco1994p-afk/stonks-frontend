import { inject, Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface User {
    id: string,
    email: string,
    roles: string[],
    createdAt: string,
}

@Injectable({ providedIn: 'root' })
export class AdminUsersService {
    private baseUrl = inject(ApiService).baseUrl;
    private http = inject(HttpClient);

    private adminUsersUrl = this.baseUrl + '/admin-users';

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.adminUsersUrl}/users`);
    }

    deleteUser(userId: string): Observable<{ message: string }> {
        return this.http.delete<{ message: string }>(`${this.adminUsersUrl}/users/${userId}`);
    }

    updateUserRoles(userId: string, roles: string[]): Observable<{ message: string; roles: string[] }> {
        return this.http.put<{ message: string; roles: string[] }>(
            `${this.adminUsersUrl}/users/${userId}`,
            { roles }
        );
    }
}