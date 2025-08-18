import { inject, Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface Investment {
    id: string;
    userId: string;
    name: string;
    value: number;
    createdAt?: any;
    updatedAt?: string;
    valueInUSD: number;
}


@Injectable({
    providedIn: 'root'
})
export class InvestmentsService {
    private baseUrl = inject(ApiService).baseUrl;
    private http = inject(HttpClient);

    getInvestments(): Observable<Investment[]> {
        return this.http.get<Investment[]>(this.baseUrl + "/investments");
    }

    addInvestment(investment: Pick<Investment, "name" | "value">): Observable<Investment> {
        return this.http.post<Investment>(this.baseUrl + "/investments", investment);
    }

    updateInvestment(id: string, investment: Pick<Investment, "name" | "value">): Observable<Investment> {
        return this.http.put<Investment>(this.baseUrl + `/investments/${id}`, investment);
    }

    deleteInvestment(id: string): Observable<{ success: boolean; id: string }> {
        return this.http.delete<{ success: boolean; id: string }>(this.baseUrl + `/investments/${id}`);
    }
}