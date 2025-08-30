import { CommonModule, DatePipe } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";

import { InvestmentsService } from "../../../services/investments.service";
import { FormsModule } from "@angular/forms";
import { StatusService } from "../../../dashboard/statusbar/status.service";

@Component({
    standalone: true,
    selector: 'app-investment-total',
    imports: [CommonModule, FormsModule],
    templateUrl: './investments-total.component.html',
    styleUrl: './investments-commons.component.css',
}) export class InvestmentsTotalComponent {
    private investmentsService = inject(InvestmentsService);
    private statusService = inject(StatusService);
    
    recalculate() {
        this.investmentsService.recalculateCurrentValues().subscribe({
            next: res => {
                console.log(res);
            },
            error: (err) => {
                this.statusService.setMessage('Error while recalculating: ' + err.status);
            }
        });
    }
}
