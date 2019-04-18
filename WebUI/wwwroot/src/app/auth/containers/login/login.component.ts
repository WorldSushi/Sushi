import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '../../reducers/auth.reducer';
import { FormGroup, FormControl } from '@angular/forms';
import { LoadAuths } from '../../actions/auth.actions';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(private store: Store<AuthState>, 
    private authService: AuthService,
    private router: Router) { }

  authForm = new FormGroup({
    login: new FormControl(""),
    password: new FormControl("")
  });

  authorize() {
    this.authService.getAuthorization(this.authForm.value).subscribe(res => {
      if(res.role == 10)
        this.router.navigate(['admin'])
      else
        this.router.navigate(['manager'])
    });
  }

  ngOnInit() {
  }

}
