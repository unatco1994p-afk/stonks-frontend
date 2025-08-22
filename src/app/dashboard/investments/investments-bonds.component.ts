import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { InvestmentsBondsEditComponent } from "./investments-bonds-edit.component";

@Component({
    standalone: true,
    selector: 'app-investment-bonds',
    imports: [CommonModule, InvestmentsBondsEditComponent],
    templateUrl: './investments-bonds.component.html',
    styleUrl: './investments-commons.component.css',
}) export class InvestmentsBondsComponent {

}
