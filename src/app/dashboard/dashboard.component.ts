import { AfterViewInit, Component, inject, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtMenubarComponent } from './menubar/utmenubar.component';
import { WindowRegisterService } from '../windows/window-register.service';
import { StatusBarComponent } from './statusbar/statusbar.component';

@Component({
    standalone: true,
    selector: 'app-dashboard',
    imports: [CommonModule, UtMenubarComponent, StatusBarComponent],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements AfterViewInit, OnInit{
    private windowRegister = inject(WindowRegisterService);

    @ViewChild('windowContainer', { read: ViewContainerRef }) windowContainer!: ViewContainerRef;

    useDesktop = false; // TODO: will be fixed

    ngOnInit(): void {
        this.useDesktop = localStorage.getItem('desktop') === 'true';
    }

    ngAfterViewInit(): void {
        this.windowRegister.setViewContainer(this.windowContainer);
    }
}
