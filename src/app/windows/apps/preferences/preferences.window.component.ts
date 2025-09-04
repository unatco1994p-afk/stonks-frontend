import { Component, inject, OnInit } from "@angular/core";
import { AbstractWindow } from "../../abstract-window.component";
import { WindowComponent } from "../../window.component";
import { WindowTabDirective } from "../../window-tab.directive.component";
import { CommonModule } from "@angular/common";
import { PreferencesService, UserPreferences } from "../../../services/preferences.service";

@Component({
    standalone: true,
    selector: 'app-preferences',
    imports: [CommonModule, WindowComponent, WindowTabDirective],
    templateUrl: './preferences.window.component.html'
})
export class PreferencesWindowComponent extends AbstractWindow implements OnInit {
    private preferences = inject(PreferencesService);
    
    showDesktop = false;
    playMenuMusic = false;
    defaultCurrency: 'PLN'|'EUR'|'USD' = 'PLN';

    override windowName = 'Preferences';

    ngOnInit(): void {
        this.preferences.loadPreferences().subscribe((pref: UserPreferences) => {
            this.showDesktop = pref.showDesktop;
            this.playMenuMusic = pref.playMenuMusic;
            this.defaultCurrency = pref.defaultCurrency;
        });
    }

    save() {
        this.preferences.updatePreferences({
            showDesktop: this.showDesktop, 
            playMenuMusic: this.playMenuMusic, 
            defaultCurrency: this.defaultCurrency
        }).subscribe();
        this.close.emit();
    }
}
