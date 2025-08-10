import { Component, inject } from '@angular/core';
import { ApiService } from '../services/api.service';
import { DatePipe, NgFor } from '@angular/common';
import { LogoutButtonComponent } from '../auth/components/logout-button.component';

@Component({
    standalone: true,
    selector: 'app-dashboard',
    imports: [NgFor, DatePipe, LogoutButtonComponent],
    template: `
    <h2>Panel użytkownika</h2>
    <p>Jesteś zalogowany 🎉</p>

<app-logout-button></app-logout-button>

     <h1>Stonks Frontend</h1>

    <button (click)="loadLogs()">Load Logs</button>
    <button (click)="addLog()">Add Log</button>

    <ul>
      <li *ngFor="let log of logs">
        {{ log.id }} -
        {{ log.createdAt?.seconds * 1000 | date:'short' }} -
        {{ log.note || '' }}
      </li>
    </ul>
  `
})
export class DashboardComponent {
    logs: any[] = [];

    private api = inject(ApiService);

    loadLogs() {
        this.api.getLogs().subscribe(res => {
            this.logs = res.logs || [];
        });
    }

    addLog() {
        this.api.addLog({ source: 'Angular frontend', note: 'Test entry' })
            .subscribe(() => this.loadLogs());
    }
}