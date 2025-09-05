import { CommonModule } from "@angular/common";
import { Component, inject, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Bond, InvestmentsService } from "../../../services/investments.service";
import { AbstractWindow } from "../../abstract-window.component";
import { WindowTabDirective } from "../../window-tab.directive.component";
import { WindowComponent } from "../../window.component";
import { StatusService } from "../../../dashboard/statusbar/status.service";

@Component({
    standalone: true,
    selector: 'app-investment-bonds-edit',
    imports: [WindowComponent, WindowTabDirective, CommonModule, ReactiveFormsModule],
    templateUrl: './investments-bonds-edit.window.component.html',
    styleUrl: './investments-commons.component.css',
})
export class InvestmentsBondsEditWindowComponent extends AbstractWindow implements OnInit {
    private service = inject(InvestmentsService);
    private fb = inject(FormBuilder);
    private statusService = inject(StatusService);

    bondForm!: FormGroup;

    @Input() bond?: Bond;
    @Input() id?: string;

    override windowName = 'Bond Details';

    ngOnInit(): void {
        if (this.bond && Array.isArray(this.bond.interestsList)) {
            this.bond.interestsList = (this.bond.interestsList as any).join(',');
        }

        this.bondForm = this.fb.group({
            name: [this.bond?.name ?? '', Validators.required],
            spot: [this.bond?.spot ?? '', Validators.required],
            description: [this.bond?.description ?? ''],
            volume: [this.bond?.volume ?? 0, [Validators.required, Validators.min(1)]],
            price: [this.bond?.price ?? 0, [Validators.required, Validators.min(0)]],
            currency: [this.bond?.currency ?? 'PLN', Validators.pattern(/\b(PLN|EUR|USD)\b(?!\s)/)],
            bondTicker: [this.bond?.bondTicker ?? '', Validators.required],
            interestsList: [this.bond?.interestsList ?? ''],
            startDate: [
                this.bond?.startDate ? new Date(this.bond.startDate).toISOString().substring(0, 10) : new Date().toISOString().substring(0, 10),
                Validators.required
            ],
            dueDate: [
                this.bond?.dueDate ? new Date(this.bond.dueDate).toISOString().substring(0, 10) : new Date().toISOString().substring(0, 10),
                Validators.required
            ],
        });
    }

    save(another = false) {
        this.bondForm.markAllAsTouched();

        if (!this.bondForm.valid) return;

        const preparedBond: Bond = {
            ...this.bondForm.value,
            startDate: new Date(this.bondForm.value.startDate).toISOString(),
            dueDate: new Date(this.bondForm.value.dueDate).toISOString(),
        };

        if (this.id) {
            // UPDATE CASE
            console.log("Updating bond with id:", this.id, preparedBond);
            this.service.updateBond(this.id, preparedBond).subscribe(data => {
                this.statusService.setMessage(`Bond ${data.name} updated.`)
                this.close.emit();
            });
        } else {
            // CREATE CASE
            console.log("Creating new bond:", preparedBond);
            this.service.addBond(preparedBond).subscribe(data => {
                this.statusService.setMessage(`Bond ${data.name} created.`)
                this.close.emit(another);
            });
        }
    }
}