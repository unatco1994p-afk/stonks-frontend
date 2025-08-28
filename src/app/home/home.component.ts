import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../auth/login.component';
import { RegisterComponent } from '../auth/register.component';
import { WindowComponent, WindowData } from '../windows/window.component';
import { WindowTabDirective } from '../windows/window-tab.directive.component';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'app-home',
    imports: [CommonModule, LoginComponent, RegisterComponent, WindowComponent, WindowTabDirective],
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    homeWindow: WindowData | null = null;

    ngOnInit(): void {
        this.setWindow();
    }

    closeWindow() {
        this.homeWindow = null;
        setTimeout(() => {
            this.setWindow();
        }, 500);
    }

    setWindow() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        const divWidth = 600;
        const divHeight = 200;

        const x = (windowWidth - divWidth) / 2;
        const y = (windowHeight - divHeight) / 2 - 100;

        this.homeWindow = {
            id: 0,
            x: x,
            y: y,
            width: 600,
            title: 'Authorization'
        };
    }
}
