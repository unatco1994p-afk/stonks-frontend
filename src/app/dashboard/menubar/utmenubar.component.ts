import { Component, HostListener, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { WindowEntry, WindowRegisterService } from '../../windows/window-register.service';
import { StatusService } from '../statusbar/status.service';
import { Router } from '@angular/router';
import { PreferencesWindowComponent } from '../../windows/apps/preferences/preferences.window.component';
import { AboutWindowComponent } from '../../windows/apps/about/about.window.component';
import { InvestmentsWindowComponent } from '../../windows/apps/investments/investments.window.component';
import { LogExplorerWindowComponent } from '../../windows/apps/log-explorer/log-explorer.window.component';
import { AdminUsersWindowComponent } from '../../windows/apps/admin-users/admin-users.window.component';

@Component({
    selector: 'ut-menubar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './utmenubar.component.html',
    styleUrl: './utmenubar.component.css'
})
export class UtMenubarComponent implements OnInit {
    private windowsRegister = inject(WindowRegisterService);
    private statusService = inject(StatusService);
    private authService = inject(AuthService);
    private router = inject(Router);

    private hoverSound = new Audio('assets/sounds/hover.wav');
    private menuSound = new Audio('assets/sounds/menu.wav');
    private windowSound = new Audio('assets/sounds/window.wav');

    openMenu: string | null = null;

    isAdmin = false;
    email = '';
    role = 'guest';

    windowsManagerItems?: WindowEntry[] = [];

    ngOnInit(): void {
        this.isAdmin = this.authService.hasRole('admin');
        this.email = this.authService.getDecodedToken()!.email;
        this.role = this.authService.getRoles()[0];

        this.windowsRegister.windowsChanges$.subscribe(windows => {
            this.windowsManagerItems = windows;
        });
    }

    toggleMenu(menu: string, event: MouseEvent) {
        console.log(`toggleMenu:${menu}`);

        event.stopPropagation();
        this.openMenu = this.openMenu === menu ? null : menu;

        if (this.openMenu) {
            this.playMenu();
        }
    }

    hoverMenu(menu: string, event: MouseEvent) {
        if (this.openMenu) {
            event.stopPropagation();
            this.openMenu = this.openMenu === menu ? null : menu;
        }

        if (this.openMenu) {
            this.playMenu();
        }

        this.sendMessage('Click to see ' + menu + ' menu.');
    }

    onItem(item: string) {
        console.log('Menu item clicked:', item);
        this.openMenu = null;

        this.runApp(item);

        this.menuSound.muted = true;
        setTimeout(() => {
            this.menuSound.muted = false;
        }, 350);
    }

    runApp(item: string) {
        if (item === 'Logout') {
            localStorage.removeItem('token');
            this.router.navigate(['/']);
        } else if (item === 'Users') {
            this.windowsRegister.registerWindow(AdminUsersWindowComponent);
        } else if (item === 'Log Explorer') {
            this.windowsRegister.registerWindow(LogExplorerWindowComponent);
        } else if (item === 'Investments') {
            this.windowsRegister.registerWindow(InvestmentsWindowComponent, false); // TODO: fix singletons
        } else if (item === 'About') {
            this.windowsRegister.registerWindow(AboutWindowComponent);
        } else if (item === 'Preferences') {
            this.windowsRegister.registerWindow(PreferencesWindowComponent);
        }
    }

    onWindow(winId: number) {
        const entry = this.windowsManagerItems?.find(w => w.id === winId);

        if (entry) {
            this.windowsRegister.setActive(entry);

            this.menuSound.muted = true;
            setTimeout(() => {
                this.menuSound.muted = false;
            }, 350);

            this.playWindow();
        }
    }

    sendMessage(message: string | null) {
        this.statusService.setMessage(message);
    }

    onCloseAllWindows() {
        this.windowsRegister.closeAll();
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(_: MouseEvent) {
        // kliknięcie poza komponent zamyka menu
        this.openMenu = null;
    }

    @HostListener('document:keydown.escape', ['$event'])
    onEsc(_: KeyboardEvent) {
        this.openMenu = null;
    }

    playHover() {
        this.hoverSound.currentTime = 0;
        this.hoverSound.volume = 0.5;
        this.hoverSound.play();
    }

    playMenu() {
        this.menuSound.currentTime = 0;
        this.menuSound.volume = 0.5;
        this.menuSound.play();
    }

    playWindow() {
        this.windowSound.currentTime = 0;
        this.windowSound.volume = 0.5;
        this.windowSound.play();
    }
}
