import { Component, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { WindowComponent, WindowData } from '../windows/window.component';
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
import { InvestmentsCryptoComponent } from './investments/investments-cryoto.component';

@Component({
    standalone: true,
    selector: 'app-dashboard',
    imports: [NgFor, NgIf, WindowComponent, UtMenubarComponent, AdminUsersComponent, LogExplorerComponent, LogExplorerNewComponent, WindowTabDirective,
        InvestmentsBondsComponent, InvestmentsDepoComponent, InvestmentsStockComponent, InvestmentsTotalComponent, InvestmentsCryptoComponent
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
    private windowSound = new Audio('assets/sounds/window.wav');
    
    usersWindow: WindowData | null = null;
    logExplorerWindow: WindowData | null = null;
    investmentsWindow: WindowData | null = null;

    private nextId = 1;

    private router = inject(Router);

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
            this.playWindow();
            this.usersWindow = {
                id: this.nextId++,
                title: 'Users',
                x: 20 + Math.random() * 150,
                y: 20 + Math.random() * 100
            }
        } else if (item === 'Log Explorer') {
            this.playWindow();
            this.logExplorerWindow = {
                id: this.nextId++,
                title: 'Log Explorer',
                x: 20 + Math.random() * 150,
                y: 20 + Math.random() * 100
            }
        } else if (item === 'Investments') {
            this.playWindow();
            this.investmentsWindow = {
                id: this.nextId++,
                title: 'Investments',
                x: 20 + Math.random() * 150,
                y: 20 + Math.random() * 100,
                width: 1000
            }
        }
    }

    playWindow() {
        this.windowSound.currentTime = 0;
        this.windowSound.volume = 0.5;
        this.windowSound.play();
    }
}