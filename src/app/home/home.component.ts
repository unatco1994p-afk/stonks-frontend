import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginComponent } from '../auth/login.component';
import { RegisterComponent } from '../auth/register.component';
import { WindowComponent } from '../windows/window.component';
import { WindowTabDirective } from '../windows/window-tab.directive.component';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'app-home',
    imports: [CommonModule, RouterLink, LoginComponent, RegisterComponent, WindowComponent, WindowTabDirective],
    templateUrl: './home.component.html'
})
export class HomeComponent {
    homeWindow = {
        x: 20,
        y: 20,
        title: 'Authorization'
    } as any;

    closeWindow() {
        this.homeWindow = null;
        setTimeout(() => {
            this.homeWindow = {
                x: 20,
                y: 20,
                title: 'Authorization'
            } as any;
        }, 500);
    }
}
