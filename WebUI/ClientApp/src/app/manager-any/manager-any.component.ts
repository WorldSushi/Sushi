import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manager-any',
  templateUrl: './manager-any.component.html',
  styleUrls: ['./manager-any.component.sass']
})
export class ManagerAnyComponent implements OnInit {

  logout(){
    window.location.href = "/Account/Logout"
  }

  constructor() { }

  ngOnInit() {
  }

}
