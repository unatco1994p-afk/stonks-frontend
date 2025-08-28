import { Component, Input } from "@angular/core";
import { AbstractWindow } from "../../windows/abstract-window.component";
import { WindowComponent } from "../../windows/window.component";
import { WindowTabDirective } from "../../windows/window-tab.directive.component";

@Component({
    standalone: true,
    selector: 'app-question',
    imports: [WindowComponent, WindowTabDirective],
    templateUrl: './question.window.component.html'
})
export class QuestionWindowComponent extends AbstractWindow {
    @Input() questionText!: string;
    
    override windowName = 'Question';
}