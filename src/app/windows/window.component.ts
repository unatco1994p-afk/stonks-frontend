import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-window',
  imports: [CommonModule],
  templateUrl: './window.component.html',
  styleUrl: './window.component.css'
})
export class WindowComponent {
  @Input() title = 'Okno';
  @Input() x = 100;
  @Input() y = 100;

  @Output() closed = new EventEmitter<void>();

  private dragging = false;
  private offsetX = 0;
  private offsetY = 0;

  onClose() {
    this.closed.emit();
  }

  onMouseDown(event: MouseEvent) {
    this.dragging = true;
    this.offsetX = event.clientX - this.x;
    this.offsetY = event.clientY - this.y;
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.dragging = false;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.dragging) {
      this.x = event.clientX - this.offsetX;
      this.y = event.clientY - this.offsetY;
    }
  }
}
