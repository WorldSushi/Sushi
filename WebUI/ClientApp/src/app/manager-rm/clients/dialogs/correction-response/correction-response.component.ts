import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CallsComment } from '../../../../сontroler/Calls/shared/models/сalls-сomment.model';

@Component({
  selector: 'app-correction-response',
  templateUrl: './correction-response.component.html',
  styleUrls: ['./correction-response.component.sass']
})
export class CorrectionResponseComponent implements OnInit {

  callsAccept: CallsComment[] = [];
  clientAccept: CallsComment[] = [];

  close() {
    location.reload();
    this.dialogRef.close();
  }

  comment(idClient, idContact, $event) {
    let comment = $event.currentTarget.value;
    this.http.get('api/manager/Client/Comment?idClient=' + idClient + "&idContact=" + idContact + "&comment=" + comment).subscribe();
  }

  comment1(idClient, $event) {
    let comment = $event.currentTarget.value;
    this.http.get('api/manager/Client/CommentClient?idClient=' + idClient + "&comment=" + comment).subscribe();
  }

  corect(idClient, idContact, $event) {
    document.getElementById("tbodyId").removeChild($event.currentTarget.parentElement.parentElement);
    this.http.get('api/manager/Client/Corect?idClient=' + idClient + "&contactId=" + idContact).subscribe();
  }

  corect1(idClient, $event) {
    document.getElementById("tbodyId1").removeChild($event.currentTarget.parentElement.parentElement);
    this.http.get('api/manager/Client/CorectCliet?idClient=' + idClient).subscribe();
  }

  constructor(public dialogRef: MatDialogRef<CorrectionResponseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient) {
    this.callsAccept = data.callsComments.filter(c => c.type == 'Звонок');
    this.clientAccept = data.callsComments.filter(c => c.type == 'Клиент');
  }

  ngOnInit() {
  }
}
