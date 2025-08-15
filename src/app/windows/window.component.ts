import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ContentChildren, EventEmitter, HostListener, Input, Output, QueryList } from '@angular/core';
import { WindowTabDirective } from './window-tab.directive.component';

@Component({
    standalone: true,
    selector: 'app-window',
    imports: [CommonModule],
    templateUrl: './window.component.html',
    styleUrl: './window.component.css'
})
export class WindowComponent implements AfterViewInit {
    @Input() title = 'Okno';
    @Input() x = 100;
    @Input() y = 100;

    @ContentChildren(WindowTabDirective, { descendants: true }) tabs!: QueryList<WindowTabDirective>;

    @Output() closed = new EventEmitter<void>();

    activeIndex = 0;

    setActive(i: number) {
        this.activeIndex = i;
    }

    private dragging = false;
    private offsetX = 0;
    private offsetY = 0;

    ngAfterViewInit(): void {
        console.log(this.tabs);
    }

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
