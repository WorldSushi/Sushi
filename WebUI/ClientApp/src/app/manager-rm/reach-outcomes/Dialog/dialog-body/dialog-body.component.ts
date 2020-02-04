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
    var d = new Date(new Date().getTime());
    var diff = d.getDate() - d.getDay() + 1;
    if (d.getDay() == 0)
      diff -= 7;
    diff += 4;
    let tmpDate = new Date(d.setDate(diff));

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
    private http: HttpClient) {
    console.log(data);
  }

  ngOnInit() {
    this.initDate();
  }

}
