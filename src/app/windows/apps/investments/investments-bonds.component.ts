import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { InvestmentsBondsEditWindowComponent } from "./investments-bonds-edit.window.component";
import { Bond, InvestmentsService } from "../../../services/investments.service";
import { WindowRegisterService } from "../../window-register.service";
import { QuestionWindowComponent } from "../../shared/question.window.component";

export interface TotalBond {
    currency: string;
    volume: number;
    initialValue: number;
    currentValue: number;
}

@Component({
    standalone: true,
    selector: 'app-investment-bonds',
    imports: [CommonModule],
    templateUrl: './investments-bonds.component.html',
    styleUrl: './investments-commons.component.css',
}) export class InvestmentsBondsComponent implements OnInit {
    private windowRegister = inject(WindowRegisterService);
    private service = inject(InvestmentsService);

    bonds: Bond[] = [];

    totalBonds: TotalBond[] = [];

    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.service.getBonds().subscribe(bonds => {
            this.bonds = bonds;

            const grouped = bonds.reduce((acc, b) => {
                if (!acc[b.currency]) {
                    acc[b.currency] = {
                        currency: b.currency,
                        volume: 0,
                        initialValue: 0,
                        currentValue: 0
                    };
                }
                acc[b.currency].volume += b.volume;
                acc[b.currency].initialValue += b.volume * b.price;
                acc[b.currency].currentValue += b.currentValue;
                return acc;
            }, {} as { [currency: string]: TotalBond });

            this.totalBonds = Object.values(grouped);
        });
    }

    editBond(bond: Bond) {
        const ref = this.windowRegister.registerWindow(InvestmentsBondsEditWindowComponent, false, { id: bond.id, bond: bond });

        ref.ref.instance.close.subscribe(() => this.refresh());
    }

    deleteBond(bond: Bond) {
        const ref = this.windowRegister.registerWindow(QuestionWindowComponent, false, { questionText: `Do you really want to remove bond ${bond.name}?` });

        ref.ref.instance.close.subscribe(result => {
            if (result === 'yes') {
                this.service.deleteBond(bond.id).subscribe(() => this.refresh());
            }
        });
    }

    addBond() {
        const ref = this.windowRegister.registerWindow(InvestmentsBondsEditWindowComponent);

        ref.ref.instance.close.subscribe(() => this.refresh());
    }
}
