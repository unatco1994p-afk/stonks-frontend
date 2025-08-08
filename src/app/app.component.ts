import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { NgFor, DatePipe} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor, DatePipe],
  template: `
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
export class AppComponent {
  logs: any[] = [];

  constructor(private api: ApiService) {}

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
