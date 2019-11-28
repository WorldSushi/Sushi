import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { ClientAccept } from '../../../../manager-rm/clients/shared/models/client-accep.modelt';
import { CallsComment } from '../../../Calls/shared/models/сalls-сomment.model';
import { acceptControlerCalss } from '../../../Calls/shared/enums/accept-controler-calss';

@Component({
  selector: 'app-accept-manager-dialog',
  templateUrl: './accept-manager-dialog.component.html',
  styleUrls: ['./accept-manager-dialog.component.sass']
})
export class AcceptManagerDialogComponent implements OnInit {

   // callComments: CallsComment[] = [];

  displayedColumns: string[] = ['status', 'statusCall', 'direction', 'title', 'phone', 'duration', 'date', 'comentCon', 'comentCli', 'refAudio']


  close() {
      this.dialogRef.close(this.data);
    }

    getActionColor(clientAction) {
        if (!clientAction.statusContact || clientAction.statusContact == 0) {
            if (clientAction.contactType == 0)
                return '#e5e5e5';
            else if (clientAction.contactType == 10)
                return '#FF1493'
            else if (clientAction.contactType == 20)
                return '#B0ECDD'
            else if (clientAction.contactType == 30)
                return '#FDE488'
            else if (clientAction.contactType == 40)
                return '#00FF7F'
            else if (clientAction.contactType == 60)
                return '#58FA82'
        }
        else if (clientAction.statusContact == 1) {
            return 'red'
        }
        else if (clientAction.statusContact == 2) {
            return '#A9A9F5'
        }
    }

  setNoAccept($event, callId, clientId) {
    let comentControler = $event.currentTarget.offsetParent.children[0].value;
      this.http.get('api/conroler/ClientAccept/NoAcceptCall?comment=' + comentControler + "&callId=" + callId + "&clientId=" + clientId).subscribe();
        $event.currentTarget.offsetParent.parentElement.children[0].style.backgroundColor = "#DF013A";
            this.data.find(c => c.id == callId && c.clientId == clientId).callsComments.acceptControlerCalss = acceptControlerCalss.ControlerNoAccept;
            this.data.find(c => c.id == callId && c.clientId == clientId).callsComments.comment = comentControler;
      this.data.find(c => c.id == callId).statusContact == 1;
      $event.currentTarget.offsetParent.parentElement.children[1].children[0].style.backgroundColor = "red";
  }

  setAccept($event, callId, clientId) {
    let comentControler = $event.currentTarget.offsetParent.children[0].value;
    this.http.get('api/conroler/ClientAccept/DefaultCall?comment=' + comentControler + "&callId=" + callId + "&clientId=" + clientId).subscribe();
    $event.currentTarget.offsetParent.children[0].value = "";
      $event.currentTarget.offsetParent.parentElement.children[0].style.backgroundColor = "#FAFAFA";
          this.data.find(c => c.id == callId && c.clientId == clientId).callsComments.acceptControlerCalss = acceptControlerCalss.Default;
          this.data.find(c => c.id == callId && c.clientId == clientId).callsComments.comment = "";
      let cientAcceptOne = this.data.find(c => c.id == callId);
      cientAcceptOne.statusContact == 0;
      if (cientAcceptOne.contactType == 0)
          $event.currentTarget.offsetParent.parentElement.children[1].children[0].style.backgroundColor = '#e5e5e5';
      else if (cientAcceptOne.contactType == 10)
          $event.currentTarget.offsetParent.parentElement.children[1].children[0].style.backgroundColor = '#FF1493'
      else if (cientAcceptOne.contactType == 20)
          $event.currentTarget.offsetParent.parentElement.children[1].children[0].style.backgroundColor = '#B0ECDD'
      else if (cientAcceptOne.contactType == 30)
          $event.currentTarget.offsetParent.parentElement.children[1].children[0].style.backgroundColor = '#FDE488'
      else if (cientAcceptOne.contactType == 40)
          $event.currentTarget.offsetParent.parentElement.children[1].children[0].style.backgroundColor = '#00FF7F'
      else if (cientAcceptOne.contactType == 60)
          $event.currentTarget.offsetParent.parentElement.children[1].children[0].style.backgroundColor = '#58FA82'
  }

  setBagroundStatus(element) {
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
      @Inject(MAT_DIALOG_DATA) public data: ClientAccept[],
    private http: HttpClient) {
    console.log(data);
  }

  ngOnInit() {
  }

}
