import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ILoginModel } from '../models/login.model';
import { IUser } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

  private url = "http://localhost:59295/Account/Login";

  private httpOptions = {
    headers: new HttpHeaders({
        "Content-Type": "application/json"
    })
  }

  getAuthorization(model: ILoginModel): Observable<IUser>{
    return this.http.post<IUser>(this.url, model, this.httpOptions)
  }

  constructor(private http: HttpClient) { }
}
