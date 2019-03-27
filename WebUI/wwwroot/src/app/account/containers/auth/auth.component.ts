import { Component } from '@angular/core';
import { AuthorizeService } from '../../services/authorize.service';
import { AuthorizeCommand } from '../../commands/authorize.command';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent {

  authorize(event: AuthorizeCommand){
    this.authorizeService.authorize(event);
  }

  constructor(private authorizeService: AuthorizeService) { }
}
