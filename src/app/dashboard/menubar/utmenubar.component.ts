// ut-menubar.component.ts
import { Component, EventEmitter, HostListener, inject, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'ut-menubar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './utmenubar.component.html',
    styleUrl: './utmenubar.component.css'
})
export class UtMenubarComponent implements OnInit {
    private authService = inject(AuthService);
    
    private hoverSound = new Audio('assets/sounds/hover.wav');
    private menuSound = new Audio('assets/sounds/menu.wav');

    @Output() itemSelected = new EventEmitter<string>();

    openMenu: string | null = null;

    isAdmin = false;
    email = '';
    role = 'guest';

    ngOnInit(): void {
        this.isAdmin = this.authService.hasRole('admin');
        this.email = this.authService.getDecodedToken()!.email;
        this.role = this.authService.getRoles()[0];
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
    }

    onItem(item: string) {
        // tu możesz podłączyć routing, emitować event, itp.
        console.log('Menu item clicked:', item);
        this.openMenu = null;
        this.itemSelected.emit(item);

        this.menuSound.muted = true;
        setTimeout(() => {
            this.menuSound.muted = false;
        }, 350);
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
}
