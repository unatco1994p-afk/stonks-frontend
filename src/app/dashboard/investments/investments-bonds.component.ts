import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { InvestmentsBondsEditWindowComponent } from "./investments-bonds-edit.window.component";
import { WindowComponent, WindowData } from "../../windows/window.component";
import { Bond, InvestmentsService } from "../../services/investments.service";
import { WindowRegisterService } from "../../windows/window-register.service";

@Component({
    standalone: true,
    selector: 'app-investment-bonds',
    imports: [CommonModule, InvestmentsBondsEditWindowComponent, WindowComponent],
    templateUrl: './investments-bonds.component.html',
    styleUrl: './investments-commons.component.css',
}) export class InvestmentsBondsComponent implements OnInit {
    private windowRegister = inject(WindowRegisterService);
    private service = inject(InvestmentsService);

    bonds: Bond[] = [];
    
    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.service.getBonds().subscribe(bonds => {
            this.bonds = bonds;
        });
    }

    editBond(bond: Bond) {
        this.windowRegister.registerWindow(InvestmentsBondsEditWindowComponent, false, {id: bond.id, bond: bond});
    }

    deleteBond(bond: Bond) {
        // TODO: add dialog
        this.service.deleteBond(bond.id).subscribe(() => this.refresh());
    }

    openEditWindow() {
        this.windowRegister.registerWindow(InvestmentsBondsEditWindowComponent);
    }
}
