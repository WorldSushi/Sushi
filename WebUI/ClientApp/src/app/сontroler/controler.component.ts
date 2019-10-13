import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-controler',
  templateUrl: './controler.component.html',
  styleUrls: ['./controler.component.sass']
})
export class ControlerComponent implements OnInit {

  manager: any;

  logout(){
    window.location.href = "/Account/Logout"
  }

  getManager() {
    this.http.get('api/Account/Name').subscribe((data: any) => {
      this.manager = data;
      this.cdr.detectChanges();
    });
  }

  constructor(private http: HttpClient,
    private cdr: ChangeDetectorRef) {
    this.getManager();
  }

  ngOnInit() {
  }

}
