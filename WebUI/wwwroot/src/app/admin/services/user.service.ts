import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'api/user';

  getAll(){
    return this.http.get(this.url)
      //.subscribe(res => console.log(res));
  }

  constructor(private http: HttpClient) { }
}
