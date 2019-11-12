import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-accept-manager-dialog',
  templateUrl: './accept-manager-dialog.component.html',
  styleUrls: ['./accept-manager-dialog.component.sass']
})
export class AcceptManagerDialogComponent implements OnInit {

  displayedColumns: string[] = ['status', 'statusCall', 'direction', "answer", 'title', 'phone', 'duration', 'date', 'comentCon', 'comentCli', 'refAudio']


  close() {
    this.dialogRef.close();
  }

  setNoAccept($event, callId, clientId) {
    let comentControler = $event.currentTarget.offsetParent.children[0].value;
    if (comentControler != undefined || comentControler != "") {
      this.http.get('api/conroler/ClientAccept/NoAcceptCall?comment=' + comentControler + "&callId=" + callId + "&clientId=" + clientId).subscribe();
      $event.currentTarget.offsetParent.parentElement.children[0].style.backgroundColor = "#DF013A";
    }
  }

  setAccept($event, callId, clientId) {
    let comentControler = $event.currentTarget.offsetParent.children[0].value;
    this.http.get('api/conroler/ClientAccept/DefaultCall?comment=' + comentControler + "&callId=" + callId + "&clientId=" + clientId).subscribe();
    $event.currentTarget.offsetParent.children[0].value = "";
    $event.currentTarget.offsetParent.parentElement.children[0].style.backgroundColor = "#FAFAFA";
  }

  setBagroundStatus(element) {
    console.log(element.contactType);
    if (element.contactType == 50) {
      return "#E0F8EC";
    }
    if (element.callsComments) {
      if (element.callsComments.acceptControlerCalss == 2) {
        return element.callsComments.colorPen;
      }
      else if (element.callsComments.acceptControlerCalss == 1) {
        return "#DF013A";
      }
      else {
        return "#FAFAFA";
      }
    }

  }

  constructor(public dialogRef: MatDialogRef<AcceptManagerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient) {
    console.log(data);
  }

  ngOnInit() {
  }

}
