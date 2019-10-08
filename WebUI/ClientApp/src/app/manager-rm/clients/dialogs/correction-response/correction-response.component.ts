import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-correction-response',
  templateUrl: './correction-response.component.html',
  styleUrls: ['./correction-response.component.sass']
})
export class CorrectionResponseComponent implements OnInit {
  
  close() {
    this.dialogRef.close();
  }


  send($event) {
    this.http.get('api/manager/Client/AcceptManager?idClient=' + this.data.callsComments[0].clientId).subscribe();
    location.reload();
    this.dialogRef.close();
  }

  comment(idClient, idContact, $event) {
    let comment = $event.currentTarget.value;
    this.http.get('api/manager/Client/Comment?idClient=' + idClient + "&idContact=" + idContact + "&comment=" + comment).subscribe();
  }

  constructor(public dialogRef: MatDialogRef<CorrectionResponseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient) {
    console.log(data);
  }

  ngOnInit() {
  }
}
