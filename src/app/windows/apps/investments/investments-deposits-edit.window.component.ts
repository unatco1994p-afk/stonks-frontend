import { CommonModule } from "@angular/common";
import { Component, inject, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Deposit, InvestmentsService } from "../../../services/investments.service";
import { AbstractWindow } from "../../abstract-window.component";
import { WindowTabDirective } from "../../window-tab.directive.component";
import { WindowComponent } from "../../window.component";
import { StatusService } from "../../../dashboard/statusbar/status.service";

@Component({
    standalone: true,
    selector: 'app-investment-deposits-edit',
    imports: [WindowComponent, WindowTabDirective, CommonModule, ReactiveFormsModule],
    templateUrl: './investments-deposits-edit.window.component.html',
    styleUrl: './investments-commons.component.css',
})
export class InvestmentsDepositsEditWindowComponent extends AbstractWindow implements OnInit {
    private service = inject(InvestmentsService);
    private fb = inject(FormBuilder);
    private statusService = inject(StatusService);

    depositForm!: FormGroup;

    @Input() deposit?: Deposit;
    @Input() id?: string;

    override windowName = 'Deposit Details';

    ngOnInit(): void {
        this.depositForm = this.fb.group({
            name: [this.deposit?.name ?? '', Validators.required],
            spot: [this.deposit?.spot ?? '', Validators.required],
            description: [this.deposit?.description ?? ''],
            value: [this.deposit?.value ?? 0, [Validators.required, Validators.min(0.01)]],
            currency: [this.deposit?.currency ?? '', Validators.pattern(/\b(PLN|EUR|USD)\b(?!\s)/)],
            interest: [this.deposit?.interest ?? 0],
            startDate: [
                this.deposit?.startDate ? new Date(this.deposit.startDate).toISOString().substring(0, 10) : ''
            ]
        });
    }

    save() {
        this.depositForm.markAllAsTouched();
        if (!this.depositForm.valid) return;

        const preparedDeposit: Deposit = {
            ...this.depositForm.value,
            startDate: new Date(this.depositForm.value.startDate).toISOString(),
        };

        if (this.id) {
            this.service.updateDeposit(this.id, preparedDeposit).subscribe(data => {
                this.statusService.setMessage(`Deposit ${data.name} updated.`);
                this.close.emit();
            });
        } else {
            this.service.addDeposit(preparedDeposit).subscribe(data => {
                this.statusService.setMessage(`Deposit ${data.name} created.`);
                this.close.emit();
            });
        }
    }
}
