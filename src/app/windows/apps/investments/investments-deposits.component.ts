import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { InvestmentsService, Deposit } from "../../../services/investments.service";
import { QuestionWindowComponent } from "../../shared/question.window.component";
import { WindowRegisterService } from "../../window-register.service";
import { InvestmentsDepositsEditWindowComponent } from "./investments-deposits-edit.window.component";

interface TotalDeposit {
    currency: string;
    initialValue: number;
    currentValue: number;
}

@Component({
    standalone: true,
    selector: 'app-investment-deposits',
    imports: [CommonModule],
    templateUrl: './investments-deposits.component.html',
    styleUrl: './investments-commons.component.css',
}) export class InvestmentsDepositsComponent {
    private windowRegister = inject(WindowRegisterService);
    private service = inject(InvestmentsService);

    deposits: Deposit[] = [];
    totalDeposits: TotalDeposit[] = [];

    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.service.getDeposits().subscribe(deposits => {
            this.deposits = deposits;

            const grouped = deposits.reduce((acc, d) => {
                if (!acc[d.currency]) {
                    acc[d.currency] = {
                        currency: d.currency,
                        initialValue: 0,
                        currentValue: 0
                    };
                }
                acc[d.currency].initialValue += d.value;
                acc[d.currency].currentValue += d.currentValue;
                return acc;
            }, {} as { [currency: string]: TotalDeposit });

            this.totalDeposits = Object.values(grouped);
        });
    }

    editDeposit(deposit: Deposit) {
        const ref = this.windowRegister.registerWindow(InvestmentsDepositsEditWindowComponent, false, { id: deposit.id, deposit });
        ref.ref.instance.close.subscribe(() => this.refresh());
    }

    deleteDeposit(deposit: Deposit) {
        const ref = this.windowRegister.registerWindow(QuestionWindowComponent, false, {
            questionText: `Do you really want to remove deposit ${deposit.name}?`
        });

        ref.ref.instance.close.subscribe(result => {
            if (result === 'yes') {
                this.service.deleteDeposit(deposit.id).subscribe(() => this.refresh());
            }
        });
    }

    addDeposit() {
        const ref = this.windowRegister.registerWindow(InvestmentsDepositsEditWindowComponent);
        ref.ref.instance.close.subscribe(() => this.refresh());
    }

    calcCurrentValue(deposit: Deposit): number {
        if (deposit.interest && deposit.startDate) {
            const years = (new Date().getTime() - new Date(deposit.startDate).getTime()) / 31557600000;
            return deposit.value + (deposit.value * deposit.interest * years);
        }
        return deposit.value;
    }
}
