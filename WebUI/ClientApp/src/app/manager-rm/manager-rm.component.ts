import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manager-rm',
  templateUrl: './manager-rm.component.html',
  styleUrls: ['./manager-rm.component.sass']
})
export class ManagerRMComponent implements OnInit {

  logout(){
    window.location.href = "/Account/Logout"
  }

  constructor() { }

  ngOnInit() {
  }

}
