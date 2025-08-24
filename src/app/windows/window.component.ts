import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ContentChildren, EventEmitter, HostListener, Input, Output, QueryList } from '@angular/core';
import { WindowTabDirective } from './window-tab.directive.component';

export interface WindowData {
    id: number;
    title: string;
    x: number;
    y: number;
    width?: number;
}

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

    @Input() width? = 600;

    @ContentChildren(WindowTabDirective, { descendants: true }) tabs!: QueryList<WindowTabDirective>;

    @Output() closed = new EventEmitter<void>();

    activeIndex = 0;

    setActive(i: number) {
        this.activeIndex = i;
    }

    private dragging = false;
    private offsetX = 0;
    private offsetY = 0;
    private winWidth = 0;
    private winHeight = 0;


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

        const element = (event.target as HTMLElement).closest('.ut99-window') as HTMLElement;
        if (element) {
            this.winWidth = element.offsetWidth;
            this.winHeight = element.offsetHeight;
        }
    }

    @HostListener('document:mouseup')
    onMouseUp() {
        this.dragging = false;
    }

    @HostListener('document:mousemove', ['$event'])
    onMouseMove(event: MouseEvent) {
        if (this.dragging) {
            let newX = event.clientX - this.offsetX;
            let newY = event.clientY - this.offsetY;

            // maksymalne dopuszczalne pozycje
            const maxX = window.innerWidth - this.winWidth;
            const maxY = window.innerHeight - this.winHeight - 20;

            // przycięcie wartości
            newX = Math.max(0, Math.min(newX, maxX));
            newY = Math.max(0, Math.min(newY, maxY));

            this.x = newX;
            this.y = newY;
        }
    }
}
