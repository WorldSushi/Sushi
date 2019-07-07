import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../models/user.model';


@Injectable()
export class UserService {
    API_URL: string = environment.API_URL + "Account"
    httpOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/json"
        })
    }

    getCurrentUser(): Observable<IUser>{
        return this.http.get<IUser>(this.API_URL);
    }


    constructor(public http: HttpClient){}
}