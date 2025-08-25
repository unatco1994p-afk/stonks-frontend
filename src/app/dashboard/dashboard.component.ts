import { Component, inject, ViewChild, ViewContainerRef } from '@angular/core';
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
import { WindowRegisterService } from '../windows/window-register.service';
import { AboutWindowComponent } from './about/about.window.component';
import { AdminUsersWindowComponent } from './admin-users/admin-users.window.component';
import { LogExplorerWindowComponent } from './log-explorer/log-explorer.window.component';
import { InvestmentsWindowComponent } from './investments/investments.window.component';

@Component({
    standalone: true,
    selector: 'app-dashboard',
    imports: [NgFor, NgIf, WindowComponent, UtMenubarComponent,
        InvestmentsWindowComponent, LogExplorerWindowComponent, AdminUsersWindowComponent, AboutWindowComponent
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
    private windowRegister = inject(WindowRegisterService);
    
    @ViewChild('windowContainer', { read: ViewContainerRef }) windowContainer!: ViewContainerRef;

    private router = inject(Router);

    menuItemSelected(item: string) {
        if (item === 'Logout') {
            localStorage.removeItem('token');
            this.router.navigate(['/']);
        } else if (item === 'Users') {
            this.windowRegister.registerWindow(this.windowContainer, AdminUsersWindowComponent);
        } else if (item === 'Log Explorer') {
            this.windowRegister.registerWindow(this.windowContainer, LogExplorerWindowComponent);
        } else if (item === 'Investments') {
            this.windowRegister.registerWindow(this.windowContainer, InvestmentsWindowComponent, true);
        } else if (item === 'About') {
            this.windowRegister.registerWindow(this.windowContainer, AboutWindowComponent);
        }
    }
}