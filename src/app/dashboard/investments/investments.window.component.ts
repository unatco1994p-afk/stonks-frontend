import { Component } from "@angular/core";
import { AbstractWindow } from "../../windows/abstract-window.component";
import { WindowComponent } from "../../windows/window.component";
import { WindowTabDirective } from "../../windows/window-tab.directive.component";
import { InvestmentsBondsComponent } from "./investments-bonds.component";
import { InvestmentsCryptoComponent } from "./investments-cryoto.component";
import { InvestmentsDepoComponent } from "./investments-depo.component";
import { InvestmentsStockComponent } from "./investments-stock.component";
import { InvestmentsTotalComponent } from "./investments-total.component";

@Component({
    standalone: true,
    selector: 'app-investments-window',
    imports: [WindowComponent, WindowTabDirective, InvestmentsBondsComponent, InvestmentsDepoComponent, InvestmentsStockComponent, InvestmentsTotalComponent, InvestmentsCryptoComponent],
    templateUrl: './investments.window.component.html'
})
export class InvestmentsWindowComponent extends AbstractWindow {
    override windowName = 'Investments';
}