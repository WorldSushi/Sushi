import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { INomenclatureAnalysis } from '../models/nomenclature-analysis';


@Injectable()
export class NomenclatureAnalysissService {
    API_URL: string = environment.API_URL + "NomenclatureAnalysis/"
    httpOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/json"
        })
    }

    getNomenclatureAnalyzes(managerId: number): Observable<INomenclatureAnalysis[]>{
        return this.http.get<INomenclatureAnalysis[]>(this.API_URL + managerId);
    }

    createNomenclatureAnalysis(nomenclatureAnalysis: INomenclatureAnalysis): Observable<INomenclatureAnalysis> {
        return this.http.post<INomenclatureAnalysis>(this.API_URL, nomenclatureAnalysis, this.httpOptions);
    }

    editNomenclatureAnalysis(nomenclatureAnalysis: INomenclatureAnalysis): Observable<INomenclatureAnalysis> {
        return this.http.put<INomenclatureAnalysis>(this.API_URL + nomenclatureAnalysis.id, nomenclatureAnalysis, this.httpOptions);
    }


    constructor(public http: HttpClient){}
}