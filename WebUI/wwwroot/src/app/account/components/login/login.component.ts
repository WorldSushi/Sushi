import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { AuthorizeCommand } from '../../commands/authorize.command';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  @Output() authorizeCommand = new EventEmitter<AuthorizeCommand>();

  loginForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl('')
  })

  onSubmit(){
    this.authorizeCommand.emit(new AuthorizeCommand(
      this.loginForm.value.login,
      this.loginForm.value.password
    ));
  }

  constructor() { }
}
