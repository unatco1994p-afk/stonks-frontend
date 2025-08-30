import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { InvestmentsStocksEditWindowComponent } from "./investments-stocks-edit.window.component";
import { Stock, InvestmentsService } from "../../../services/investments.service";
import { WindowRegisterService } from "../../window-register.service";
import { QuestionWindowComponent } from "../../shared/question.window.component";

@Component({
    standalone: true,
    selector: 'app-investment-stocks',
    imports: [CommonModule],
    templateUrl: './investments-stocks.component.html',
    styleUrls: ['./investments-commons.component.css'],
})
export class InvestmentsStocksComponent implements OnInit {
    private windowRegister = inject(WindowRegisterService);
    private service = inject(InvestmentsService);

    stocks: Stock[] = [];
    totalStock: Stock & { initialValue: number } | null = null;

    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.service.getStocks().subscribe(stocks => {
            this.stocks = stocks;
            this.totalStock = {
                id: '',
                name: 'Total',
                spot: '',
                volume: stocks.map(s => s.volume).reduce((a, b) => a + b, 0),
                price: 0,
                priceRelativeToCurrency: '',
                stockTicker: '',
                dividend: 0,
                startDate: '',
                currentValue: stocks.map(s => s.currentValue).reduce((a, b) => a + b, 0),
                initialValue: stocks.map(s => s.volume * s.price).reduce((a, b) => a + b, 0),
            }
        });
    }

    addStock() {
        const ref = this.windowRegister.registerWindow(InvestmentsStocksEditWindowComponent);
        ref.ref.instance.close.subscribe(another => {
            this.refresh();
            if (another) {
                this.addStock();
            }
        });
    }

    editStock(stock: Stock) {
        const ref = this.windowRegister.registerWindow(InvestmentsStocksEditWindowComponent, false, { id: stock.id, stock });
        ref.ref.instance.close.subscribe(() => this.refresh());
    }

    deleteStock(stock: Stock) {
        const ref = this.windowRegister.registerWindow(QuestionWindowComponent, false, {
            questionText: `Do you really want to remove stock ${stock.name}?`
        });
        ref.ref.instance.close.subscribe(result => {
            if (result === 'yes') this.service.deleteStock(stock.id).subscribe(() => this.refresh());
        });
    }
}
