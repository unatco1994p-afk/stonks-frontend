import { Component } from "@angular/core";
import { AbstractWindow } from "../../windows/abstract-window.component";
import { WindowComponent } from "../../windows/window.component";
import { WindowTabDirective } from "../../windows/window-tab.directive.component";
import { LogExplorerComponent } from "./log-explorer.component";
import { LogExplorerNewComponent } from "./log-explorer-new.component";

@Component({
    standalone: true,
    selector: 'app-log-explorer-window',
    imports: [WindowComponent, WindowTabDirective, LogExplorerComponent, LogExplorerNewComponent],
    templateUrl: './log-explorer.window.component.html'
})
export class LogExplorerWindowComponent extends AbstractWindow {
    override windowName = 'Log Explorer';
}