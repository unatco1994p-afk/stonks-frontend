import { Component, inject } from '@angular/core';
import { ApiService } from '../services/api.service';
import { DatePipe, NgFor } from '@angular/common';
import { LogoutButtonComponent } from '../auth/components/logout-button.component';
import { WindowComponent } from '../windows/window.component';
import { UtMenubarComponent } from './menubar/utmenubar.component';
import { Router } from '@angular/router';

interface WindowData {
  id: number;
  title: string;
  x: number;
  y: number;
}

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [NgFor, DatePipe, LogoutButtonComponent, WindowComponent, UtMenubarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  windows: WindowData[] = [];
  private nextId = 1;

  logs: any[] = [];

  private api = inject(ApiService);
  private router = inject(Router);

  addWindow() {
    this.windows.push({
      id: this.nextId++,
      title: 'Okno ' + this.nextId,
      x: 100 + Math.random() * 300,
      y: 100 + Math.random() * 200
    });
  }

  closeWindow(id: number) {
    this.windows = this.windows.filter(w => w.id !== id);
  }

  loadLogs() {
    this.api.getLogs().subscribe(res => {
      this.logs = res.logs || [];
    });
  }

  addLog() {
    this.api.addLog({ source: 'Angular frontend', note: 'Test entry' })
      .subscribe(() => this.loadLogs());
  }

  menuItemSelected(item: string) {
    if (item === 'Logout') {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
  }
}