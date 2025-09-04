import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface UserPreferences {
  showDesktop: boolean;
  playMenuMusic: boolean;
  defaultCurrency: 'USD' | 'EUR' | 'PLN';
}

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {
  private baseUrl = inject(ApiService).baseUrl;
  private http = inject(HttpClient);
  private preferencesUrl = `${this.baseUrl}/preferences`;

  showDesktop = signal<boolean>(false);
  playMenuMusic = signal<boolean>(false);
  defaultCurrency = signal<'USD' | 'EUR' | 'PLN'>('PLN');

  private initialized = false;

  loadPreferences(): Observable<UserPreferences> {
    if (this.initialized) {
      return of({
        showDesktop: this.showDesktop(),
        playMenuMusic: this.playMenuMusic(),
        defaultCurrency: this.defaultCurrency(),
      });
    }

    return this.http.get<UserPreferences>(this.preferencesUrl).pipe(
      tap((pref: UserPreferences) => {
        this.showDesktop.set(pref.showDesktop);
        this.playMenuMusic.set(pref.playMenuMusic);
        this.defaultCurrency.set(pref.defaultCurrency);
        this.initialized = true;
      })
    );
  }

  updatePreferences(preferences: UserPreferences): Observable<UserPreferences> {
    return this.http.put<UserPreferences>(this.preferencesUrl, preferences).pipe(
      tap((pref: UserPreferences) => {
        if (pref.showDesktop !== undefined) this.showDesktop.set(pref.showDesktop);
        if (pref.playMenuMusic !== undefined) this.playMenuMusic.set(pref.playMenuMusic);
        if (pref.defaultCurrency !== undefined) this.defaultCurrency.set(pref.defaultCurrency);
      })
    );
  }

  clear(): void {
    this.showDesktop.set(false);
    this.playMenuMusic.set(false);
    this.defaultCurrency.set('PLN');
    this.initialized = false;
  }
}
