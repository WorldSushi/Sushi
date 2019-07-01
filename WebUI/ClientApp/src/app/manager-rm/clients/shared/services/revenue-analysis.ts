import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IRevenueAnalysis } from '../models/revenue-analysis';


@Injectable()
export class RevenueAnalysisService {
    API_URL: string = environment.API_URL + "RevenueAnalysis/"
    httpOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/json"
        })
    }

    getRevenueAnalyzes(managerId: number): Observable<IRevenueAnalysis[]>{
        return this.http.get<IRevenueAnalysis[]>(this.API_URL + managerId);
    }

    createRevenueAnalysis(revenueAnalysis: IRevenueAnalysis): Observable<IRevenueAnalysis> {
        return this.http.post<IRevenueAnalysis>(this.API_URL, revenueAnalysis, this.httpOptions);
    }

    editRevenueAnalysis(revenueAnalysis: IRevenueAnalysis): Observable<IRevenueAnalysis> {
        return this.http.put<IRevenueAnalysis>(this.API_URL + revenueAnalysis.id, revenueAnalysis, this.httpOptions);
    }


    constructor(public http: HttpClient){}
}