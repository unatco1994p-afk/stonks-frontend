import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StatusService {
  private message$ = new BehaviorSubject<string>('Use menu bar to start.');

  setMessage(message: string | null) {
    if (message) {
        this.message$.next(message);
    } else {
        this.message$.next('Use menu bar to start.');
    }
  }

  getMessage(): Observable<string> {
    return this.message$.asObservable();
  }
}