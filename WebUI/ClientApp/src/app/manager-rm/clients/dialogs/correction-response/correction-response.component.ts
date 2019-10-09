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
    location.reload();
    this.dialogRef.close();
  }

  comment(idClient, idContact, $event) {
    let comment = $event.currentTarget.value;
    this.http.get('api/manager/Client/Comment?idClient=' + idClient + "&idContact=" + idContact + "&comment=" + comment).subscribe();
  }

  corect(idClient, idContact, $event) {
    document.getElementById("tbodyId").removeChild($event.currentTarget.parentElement.parentElement);
    this.http.get('api/manager/Client/Corect?idClient=' + idClient + "&contactId=" + idContact).subscribe();
  }

  constructor(public dialogRef: MatDialogRef<CorrectionResponseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient) {
    console.log(data);
  }

  ngOnInit() {
  }
}
