import { CommonModule } from "@angular/common";
import { Component, inject, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Crypto, InvestmentsService } from "../../../services/investments.service";
import { AbstractWindow } from "../../abstract-window.component";
import { WindowTabDirective } from "../../window-tab.directive.component";
import { WindowComponent } from "../../window.component";
import { StatusService } from "../../../dashboard/statusbar/status.service";

@Component({
    standalone: true,
    selector: 'app-investment-cryptos-edit',
    imports: [WindowComponent, WindowTabDirective, CommonModule, ReactiveFormsModule],
    templateUrl: './investments-cryptos-edit.window.component.html',
    styleUrl: './investments-commons.component.css',
})
export class InvestmentsCryptosEditWindowComponent extends AbstractWindow implements OnInit {
    private service = inject(InvestmentsService);
    private fb = inject(FormBuilder);
    private statusService = inject(StatusService);

    cryptoForm!: FormGroup;

    @Input() crypto?: Crypto;
    @Input() id?: string;

    override windowName = 'Crypto Details';

    ngOnInit(): void {
        this.cryptoForm = this.fb.group({
            name: [this.crypto?.name ?? '', Validators.required],
            spot: [this.crypto?.spot ?? '', Validators.required],
            description: [this.crypto?.description ?? ''],
            quantity: [this.crypto?.quantity ?? 0, [Validators.required, Validators.min(0.0001)]],
            priceAtStartDate: [this.crypto?.priceAtStartDate ?? 0],
            priceRelativeToCurrency: [this.crypto?.priceRelativeToCurrency ?? ''],
            cryptoSymbol: [this.crypto?.cryptoSymbol ?? '', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
            stakingInterest: [this.crypto?.stakingInterest ?? 0],
            startDate: [
                this.crypto?.startDate ? new Date(this.crypto.startDate).toISOString().substring(0, 10) : '',
                Validators.required
            ],
        });
    }

    save() {
        this.cryptoForm.markAllAsTouched();
        if (!this.cryptoForm.valid) return;

        const preparedCrypto: Crypto = {
            ...this.cryptoForm.value,
            startDate: new Date(this.cryptoForm.value.startDate).toISOString(),
        };

        if (this.id) {
            this.service.updateCrypto(this.id, preparedCrypto).subscribe(data => {
                this.statusService.setMessage(`Crypto ${data.name} updated.`);
                this.close.emit();
            });
        } else {
            this.service.addCrypto(preparedCrypto).subscribe(data => {
                this.statusService.setMessage(`Crypto ${data.name} created.`);
                this.close.emit();
            });
        }
    }
}
