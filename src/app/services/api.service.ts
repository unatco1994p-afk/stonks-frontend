import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.backendUrl;

  constructor(private http: HttpClient) {}

  getLogs(): Observable<any> {
    return this.http.get(`${this.baseUrl}/logs`);
  }

  addLog(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/log`, data);
  }
}
