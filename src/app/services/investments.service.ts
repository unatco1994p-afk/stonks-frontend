import { inject, Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface Deposit {
    name: string,
    spot: string,
    description?: string,
    value: number,
    currency: string,
    interest?: number,
    startDate?: string
}

export interface Crypto {
    name: string,
    spot: string,
    description?: string,
    quantity: number,
    priceAtStartDate?: number,
    priceRelativeToCurrency?: string,
    cryptoSymbol: string,
    stakingInterest?: number,
    startDate?: string
}

export interface Bond {
    name: string,
    spot: string,
    description?: string,
    volume: number,
    price: number,
    bondTicker: string,
    interest: number,
    interestsList?: string,
    startDate: string,
    dueDate: string
}

export interface Stock {
    name: string,
    spot: string,
    description?: string,
    volume: number,
    price: number,
    priceRelativeToCurrency: string,
    startDate: string,
    stockTicker: string,
    dividend?: number
}

@Injectable({
    providedIn: 'root'
})
export class InvestmentsService {
    private baseUrl = inject(ApiService).baseUrl;
    private http = inject(HttpClient);

    private investmentsUrl = this.baseUrl + '/investments';

    getDeposits(): Observable<Deposit[]> {
        return this.http.get<Deposit[]>(`${this.investmentsUrl}/deposits`);
    }

    addDeposit(deposit: Deposit): Observable<Deposit> {
        return this.http.post<Deposit>(`${this.investmentsUrl}/deposits`, deposit);
    } 

    updateDeposit(id: string, deposit: Deposit): Observable<Deposit> {
        return this.http.put<Deposit>(`${this.investmentsUrl}/deposits/${id}`, deposit);
    }

    deleteDeposit(id: string): Observable<{ success: boolean; id: string }> {
        return this.http.delete<{ success: boolean; id: string }>(`${this.investmentsUrl}/deposits/${id}`);
    }

    getCryptos(): Observable<Crypto[]> {
        return this.http.get<Crypto[]>(`${this.investmentsUrl}/cryptos`);
    }

    addCrypto(crypto: Crypto): Observable<Crypto> {
        return this.http.post<Crypto>(`${this.investmentsUrl}/cryptos`, crypto);
    } 

    updateCrypto(id: string, crypto: Crypto): Observable<Crypto> {
        return this.http.put<Crypto>(`${this.investmentsUrl}/cryptos/${id}`, crypto);
    }

    deleteCrypto(id: string): Observable<{ success: boolean; id: string }> {
        return this.http.delete<{ success: boolean; id: string }>(`${this.investmentsUrl}/cryptos/${id}`);
    }

    getBonds(): Observable<Bond[]> {
        return this.http.get<Bond[]>(`${this.investmentsUrl}/bonds`);
    }

    addBond(bond: Bond): Observable<Bond> {
        return this.http.post<Bond>(`${this.investmentsUrl}/bonds`, bond);
    } 

    updateBond(id: string, bond: Bond): Observable<Bond> {
        return this.http.put<Bond>(`${this.investmentsUrl}/bonds/${id}`, bond);
    }

    deleteBond(id: string): Observable<{ success: boolean; id: string }> {
        return this.http.delete<{ success: boolean; id: string }>(`${this.investmentsUrl}/bonds/${id}`);
    }

    getStocks(): Observable<Stock[]> {
        return this.http.get<Stock[]>(`${this.investmentsUrl}/stocks`);
    }

    addStock(stock: Stock): Observable<Stock> {
        return this.http.post<Stock>(`${this.investmentsUrl}/stocks`, stock);
    } 

    updateStock(id: string, stock: Stock): Observable<Stock> {
        return this.http.put<Stock>(`${this.investmentsUrl}/stocks/${id}`, stock);
    }

    deleteStock(id: string): Observable<{ success: boolean; id: string }> {
        return this.http.delete<{ success: boolean; id: string }>(`${this.investmentsUrl}/stocks/${id}`);
    }
}