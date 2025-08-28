import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { InvestmentsBondsEditWindowComponent } from "./investments-bonds-edit.window.component";
import { Bond, InvestmentsService } from "../../../services/investments.service";
import { WindowRegisterService } from "../../window-register.service";
import { QuestionWindowComponent } from "../../shared/question.window.component";

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
    
    totalBond: Bond & {initialValue: number} | null = null;

    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.service.getBonds().subscribe(bonds => {
            this.bonds = bonds;

            this.totalBond = {
                id: '',
                name: 'Total',
                spot: '',
                volume: bonds.map(b => b.volume).reduce((a, b) => a + b, 0),
                price: 0,
                currency: '',
                bondTicker: '',
                interest: 0,
                startDate: '',
                dueDate: '',
                currentValue: bonds.map(b => b.currentValue).reduce((a, b) => a + b, 0),
                initialValue: bonds.map(b => b.volume*b.price).reduce((a,b) => a+b, 0),
            }
        });
    }

    editBond(bond: Bond) {
        const ref = this.windowRegister.registerWindow(InvestmentsBondsEditWindowComponent, false, {id: bond.id, bond: bond});

        ref.ref.instance.close.subscribe(() => this.refresh());
    }

    deleteBond(bond: Bond) {
        const ref = this.windowRegister.registerWindow(QuestionWindowComponent, false, {questionText: `Do you really want to remove bond ${bond.name}?`});

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
