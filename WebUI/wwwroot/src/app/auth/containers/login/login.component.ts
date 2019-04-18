import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '../../reducers/auth.reducer';
import { FormGroup, FormControl } from '@angular/forms';
import { LoadAuths } from '../../actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(private store: Store<AuthState>) { }

  authForm = new FormGroup({
    login: new FormControl(""),
    password: new FormControl("")
  });

  authorize() {
    this.store.dispatch(new LoadAuths({data: this.authForm.value}))
  }

  ngOnInit() {
  }

}
