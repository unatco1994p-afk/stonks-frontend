import { Component, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { WindowComponent } from '../windows/window.component';
import { UtMenubarComponent } from './menubar/utmenubar.component';
import { Router } from '@angular/router';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { LogExplorerComponent } from './log-explorer/log-explorer.component';
import { WindowTabDirective } from '../windows/window-tab.directive.component';
import { LogExplorerNewComponent } from './log-explorer/log-explorer-new.component';
import { InvestmentsBondsComponent } from './investments/investments-bonds.component';
import { InvestmentsDepoComponent } from './investments/investments-depo.component';
import { InvestmentsStockComponent } from './investments/investments-stock.component';
import { InvestmentsTotalComponent } from './investments/investments-total.component';

interface WindowData {
    id: number;
    title: string;
    x: number;
    y: number;
}

@Component({
    standalone: true,
    selector: 'app-dashboard',
    imports: [NgFor, NgIf, WindowComponent, UtMenubarComponent, AdminUsersComponent, LogExplorerComponent, LogExplorerNewComponent, WindowTabDirective,
        InvestmentsBondsComponent, InvestmentsDepoComponent, InvestmentsStockComponent, InvestmentsTotalComponent
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
    windows: WindowData[] = [];
    usersWindow: WindowData | null = null;
    logExplorerWindow: WindowData | null = null;
    investmentsWindow: WindowData | null = null;

    private nextId = 1;

    logs: any[] = [];

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

    closeUsersWindow() {
        this.usersWindow = null;
    }

    closeLogExplorerWindow() {
        this.logExplorerWindow = null;
    }

    closeInvestmentsWindow() {
        this.investmentsWindow = null;
    }

    menuItemSelected(item: string) {
        if (item === 'Logout') {
            localStorage.removeItem('token');
            this.router.navigate(['/']);
        } else if (item === 'Users') {
            this.usersWindow = {
                id: this.nextId++,
                title: 'Users',
                x: 100 + Math.random() * 300,
                y: 100 + Math.random() * 200
            }
        } else if (item === 'Log Explorer') {
            this.logExplorerWindow = {
                id: this.nextId++,
                title: 'Log Explorer',
                x: 100 + Math.random() * 300,
                y: 100 + Math.random() * 200
            }
        } else if (item === 'Investments') {
            this.investmentsWindow = {
                id: this.nextId++,
                title: 'Investments',
                x: 100 + Math.random() * 300,
                y: 100 + Math.random() * 200
            }
        }
    }
}