import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { AuthorizeCommand } from '../../commands/authorize.command';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  @Output() authorizeCommand = new EventEmitter();

  loginForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl('')
  })

  onSubmit(){
    console.log(this.loginForm.value);
    this.authorizeCommand.emit(1);
  }

  constructor() { }
}
