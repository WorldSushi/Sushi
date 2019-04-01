import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserHttp } from '../models/http-models/user-http.models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'api/user';

  getAll(): Observable<IUserHttp>{
    return this.http.get<IUserHttp>(this.url);
  }

  constructor(private http: HttpClient) { }
}
