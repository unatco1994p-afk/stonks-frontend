import { Directive, EventEmitter, Input, Output } from "@angular/core";

@Directive()
export class AbstractWindow {
    windowName: string = 'Abstract Window';
    @Input() x = 20 + Math.random() * 140;
    @Input() y = 20 + Math.random() * 100;
    @Input() zIndex = 100;
    @Output() close = new EventEmitter<void>();
    @Output() focus = new EventEmitter<void>();
}
