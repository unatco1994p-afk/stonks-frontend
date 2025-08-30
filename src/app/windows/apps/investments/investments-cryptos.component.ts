import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { InvestmentsCryptosEditWindowComponent } from "./investments-cryptos-edit.window.component";
import { Crypto, InvestmentsService } from "../../../services/investments.service";
import { WindowRegisterService } from "../../window-register.service";
import { QuestionWindowComponent } from "../../shared/question.window.component";

@Component({
    standalone: true,
    selector: 'app-investment-cryptos',
    imports: [CommonModule],
    templateUrl: './investments-cryptos.component.html',
    styleUrl: './investments-commons.component.css',
})
export class InvestmentsCryptosComponent implements OnInit {
    private windowRegister = inject(WindowRegisterService);
    private service = inject(InvestmentsService);

    cryptos: Crypto[] = [];

    totalCrypto: Crypto & {initialValue: number, currentValue: number} | null = null;

    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.service.getCryptos().subscribe(cryptos => {
            this.cryptos = cryptos;

            const totalVolume = cryptos.map(c => c.quantity).reduce((a,b) => a+b, 0);
            const totalInitial = cryptos.map(c => c.quantity * (c.priceAtStartDate ?? 0)).reduce((a,b) => a+b, 0);
            const totalCurrent = cryptos.map(c => c.currentValue ?? 0).reduce((a,b) => a+b, 0);

            this.totalCrypto = {
                id: '',
                name: 'Total',
                spot: '',
                quantity: totalVolume,
                priceAtStartDate: 0,
                priceRelativeToCurrency: '',
                cryptoSymbol: '',
                stakingInterest: 0,
                startDate: '',
                currentValue: totalCurrent,
                initialValue: totalInitial
            }
        });
    }

    editCrypto(crypto: Crypto) {
        const ref = this.windowRegister.registerWindow(InvestmentsCryptosEditWindowComponent, false, {id: crypto.id, crypto: crypto});
        ref.ref.instance.close.subscribe(() => this.refresh());
    }

    deleteCrypto(crypto: Crypto) {
        const ref = this.windowRegister.registerWindow(QuestionWindowComponent, false, {questionText: `Do you really want to remove crypto ${crypto.name}?`});
        ref.ref.instance.close.subscribe(result => {
            if(result === 'yes') {
                this.service.deleteCrypto(crypto.id).subscribe(() => this.refresh());
            }
        });
    }

    addCrypto() {
        const ref = this.windowRegister.registerWindow(InvestmentsCryptosEditWindowComponent);
        ref.ref.instance.close.subscribe(another => {
            this.refresh();
            if (another) {
                this.addCrypto();
            }
        });
    }
}
