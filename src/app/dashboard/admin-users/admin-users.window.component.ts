import { Component } from "@angular/core";
import { AbstractWindow } from "../../windows/abstract-window.component";
import { WindowComponent } from "../../windows/window.component";
import { WindowTabDirective } from "../../windows/window-tab.directive.component";
import { AdminUsersComponent } from "./admin-users.component";

@Component({
    standalone: true,
    selector: 'app-admin-users-window',
    imports: [WindowComponent, WindowTabDirective, AdminUsersComponent],
    templateUrl: './admin-users.window.component.html'
})
export class AdminUsersWindowComponent extends AbstractWindow {
    override windowName = 'Users';
}
