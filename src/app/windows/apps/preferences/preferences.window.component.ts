import { Component, OnInit } from "@angular/core";
import { AbstractWindow } from "../../abstract-window.component";
import { WindowComponent } from "../../window.component";
import { WindowTabDirective } from "../../window-tab.directive.component";

@Component({
    standalone: true,
    selector: 'app-preferences',
    imports: [WindowComponent, WindowTabDirective],
    templateUrl: './preferences.window.component.html'
})
export class PreferencesWindowComponent extends AbstractWindow implements OnInit {
    useDesktop = true;
    
    override windowName = 'Preferences';

    ngOnInit(): void {
        // TODO: save preferences on server
        this.useDesktop = localStorage.getItem('desktop') === 'true';
    }

    save() {
        localStorage.setItem('desktop', `${this.useDesktop}`);
        this.close.emit();
    }
}
