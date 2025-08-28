import { Component } from "@angular/core";
import { AbstractWindow } from "../../abstract-window.component";
import { WindowComponent } from "../../window.component";
import { WindowTabDirective } from "../../window-tab.directive.component";

@Component({
    standalone: true,
    selector: 'app-about',
    imports: [WindowComponent, WindowTabDirective],
    templateUrl: './about.window.component.html'
})
export class AboutWindowComponent extends AbstractWindow {
    override windowName = 'About';
}
