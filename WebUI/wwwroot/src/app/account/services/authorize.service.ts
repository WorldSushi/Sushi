import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthorizeCommand } from '../commands/authorize.command';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeService {

  url = "/account/login";

  authorize(command: AuthorizeCommand){
    this.http.post(
      this.url,
      command
    ).subscribe(res => console.log(res));
  }

  constructor(private http: HttpClient) { }
}
