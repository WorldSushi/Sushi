import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReachOutcomes } from '../../Model/reach-outcomes.model';

@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.sass']
})
export class DialogBodyComponent implements OnInit {
  date: any[] = [];

  close() {
    this.dialogRef.close();
  }

  initDate() {
    let day = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay();
    let tmpDate = new Date(new Date().getFullYear(), new Date().getMonth(), ((7 - (7 - day)) + 2) - 28);

    for (let i = 0; i < 8; i++) {
      let datastr = this.data.resultFridays.find(r => r.dataFriday == tmpDate.toLocaleDateString()) ? this.data.resultFridays.find(r => r.dataFriday == tmpDate.toLocaleDateString()).resumeFriday : "";
      this.date.push(
      {
          datee: tmpDate.toLocaleDateString(),
          resume: datastr
      });
      tmpDate = new Date(tmpDate.getFullYear(), tmpDate.getMonth(), tmpDate.getDate() + 7)
    }
  }


  addResuldFriyDay(element, clientId, date) {
    this.data.resultFridays.push(
      {
        clientIdd: clientId,
        dataFriday: date,
        resumeFriday: element.target.value
      });
    this.http.get('api/manager/ReachOutcomes/AddResuldFriyDay?idClient=' + clientId + '&strResuldFriyDay=' + element.target.value + "&date=" + date).subscribe();
  }

  constructor(public dialogRef: MatDialogRef<DialogBodyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReachOutcomes,
    private http: HttpClient)
  {
    console.log(data);
  }

  ngOnInit() {
    this.initDate();
  }

}
