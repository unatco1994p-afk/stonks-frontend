import { Component } from "@angular/core";
import { AbstractWindow } from "../../abstract-window.component";
import { WindowComponent } from "../../window.component";
import { WindowTabDirective } from "../../window-tab.directive.component";
import { InvestmentsBondsComponent } from "./investments-bonds.component";
import { InvestmentsCryptosComponent } from "./investments-cryptos.component";
import { InvestmentsDepositsComponent } from "./investments-deposits.component";
import { InvestmentsStocksComponent } from "./investments-stocks.component";
import { InvestmentsTotalComponent } from "./investments-total.component";

@Component({
    standalone: true,
    selector: 'app-investments-window',
    imports: [WindowComponent, WindowTabDirective, InvestmentsBondsComponent, InvestmentsDepositsComponent, InvestmentsStocksComponent, InvestmentsTotalComponent, InvestmentsCryptosComponent],
    templateUrl: './investments.window.component.html'
})
export class InvestmentsWindowComponent extends AbstractWindow {
    override windowName = 'Investments';
}