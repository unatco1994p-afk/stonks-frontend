import { CommonModule, DatePipe } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";

import { InvestmentsService } from "../../../services/investments.service";
import { FormsModule } from "@angular/forms";

@Component({
    standalone: true,
    selector: 'app-investment-total',
    imports: [CommonModule, FormsModule],
    templateUrl: './investments-total.component.html',
    styleUrl: './investments-commons.component.css',
}) export class InvestmentsTotalComponent implements OnInit {
    // private investmentsService = inject(InvestmentsService);

    ngOnInit(): void {
        // this.investmentsService.getInvestments().subscribe(investments => {
        //     this.investments = investments;
        // });
    }

    // addInvestment(): void {
    //     this.investmentsService.addInvestment({ name: this.name, value: +this.value }).subscribe(() => {
    //         this.name = '';
    //         this.value = '';

    //         this.investmentsService.getInvestments().subscribe(investments => {
    //             this.investments = investments;
    //         });
    //     });
    // }
}
