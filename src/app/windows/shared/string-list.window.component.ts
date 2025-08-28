import { Component, Input, OnInit } from "@angular/core";
import { AbstractWindow } from "../../windows/abstract-window.component";
import { WindowComponent } from "../../windows/window.component";
import { WindowTabDirective } from "../../windows/window-tab.directive.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
    standalone: true,
    selector: 'app-string-list',
    imports: [CommonModule, FormsModule, WindowComponent, WindowTabDirective],
    templateUrl: './string-list.window.component.html'
})
export class StringListWindowComponent extends AbstractWindow implements OnInit {
    @Input() questionText!: string;
    @Input() inputs!: string[];
    
    ngOnInit(): void {
        console.log(this.inputs

        )
    }

    trackByIndex(index: number, item: string) {
        return index;
    }

    addInput(): void {
        this.inputs.push('');
    }

    override windowName = 'Put List';
}