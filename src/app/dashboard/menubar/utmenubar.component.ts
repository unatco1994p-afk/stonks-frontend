// ut-menubar.component.ts
import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ut-menubar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './utmenubar.component.html',
  styleUrl: './utmenubar.component.css'
})
export class UtMenubarComponent {
  @Output() itemSelected = new EventEmitter<string>();

  openMenu: string | null = null;

  toggleMenu(menu: string, event: MouseEvent) {
    // zapobiegamy bubble do document click
    event.stopPropagation();
    this.openMenu = this.openMenu === menu ? null : menu;
  }

  hoverMenu(menu: string, event: MouseEvent) {
    if (this.openMenu) {
      event.stopPropagation();
      this.openMenu = this.openMenu === menu ? null : menu;
    }
  }

  onItem(item: string) {
    // tu możesz podłączyć routing, emitować event, itp.
    console.log('Menu item clicked:', item);
    this.openMenu = null;
    this.itemSelected.emit(item);
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
}
