import { AfterViewInit, Component, inject, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtMenubarComponent } from './menubar/utmenubar.component';
import { WindowRegisterService } from '../windows/window-register.service';
import { StatusBarComponent } from './statusbar/statusbar.component';
import { PreferencesService } from '../services/preferences.service';

@Component({
    standalone: true,
    selector: 'app-dashboard',
    imports: [CommonModule, UtMenubarComponent, StatusBarComponent],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements AfterViewInit, OnInit{
    private windowRegister = inject(WindowRegisterService);
    private preferences = inject(PreferencesService);

    @ViewChild('windowContainer', { read: ViewContainerRef }) windowContainer!: ViewContainerRef;

    showDesktop = this.preferences.showDesktop;

    ngOnInit(): void {
        this.preferences.clear();
        this.preferences.loadPreferences().subscribe()
    }

    ngAfterViewInit(): void {
        this.windowRegister.setViewContainer(this.windowContainer);
    }
}
