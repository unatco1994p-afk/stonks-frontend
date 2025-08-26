import { Component } from "@angular/core";
import { AbstractWindow } from "../../windows/abstract-window.component";
import { WindowComponent } from "../../windows/window.component";
import { WindowTabDirective } from "../../windows/window-tab.directive.component";

@Component({
    standalone: true,
    selector: 'app-about',
    imports: [WindowComponent, WindowTabDirective],
    templateUrl: './about.window.component.html'
})
export class AboutWindowComponent extends AbstractWindow {
    override windowName = 'About';
}
