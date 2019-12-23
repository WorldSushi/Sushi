import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { ClientAccept } from '../../../../manager-rm/clients/shared/models/client-accep.modelt';
import { CallsComment } from '../../../Calls/shared/models/сalls-сomment.model';
import { acceptControlerCalss } from '../../../Calls/shared/enums/accept-controler-calss';
import { debug } from 'util';

@Component({
  selector: 'app-accept-manager-dialog',
  templateUrl: './accept-manager-dialog.component.html',
  styleUrls: ['./accept-manager-dialog.component.sass']
})
export class AcceptManagerDialogComponent implements OnInit {

  // callComments: CallsComment[] = [];

  displayedColumns: string[] = ['status', 'statusCall', 'direction', 'title', 'phone', 'duration', 'date', 'comentCon', 'comentCli', 'refAudio']
  audioPlay;
  audioPlayId = 0;

  close() {
    this.dialogRef.close(this.data);
  }

    getActionColor(clientAction) {
        if (!clientAction.statusContact || clientAction.statusContact == 0) {
            if (clientAction.contactType == 0 || (clientAction.durations < 150 && clientAction.contactType == 10))
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

  setNoAccept($event, callId, clientId, index = null) {
    let comentControler = $event.currentTarget.offsetParent.children[0].value;
    this.http.get('api/conroler/ClientAccept/NoAcceptCall?comment=' + comentControler + "&callId=" + callId + "&clientId=" + clientId).subscribe();
    this.data.find(c => c.id == callId && c.clientId == clientId).callsComments.acceptControlerCalss = acceptControlerCalss.ControlerNoAccept;
      this.data.find(c => c.id == callId && c.clientId == clientId).statusContact = 1;

    this.data.find(c => c.id == callId && c.clientId == clientId).callsComments.comment = comentControler;
      this.data.find(c => c.id == callId).statusContact == 1;

    if (!this._isMobile()) {
      $event.currentTarget.offsetParent.parentElement.children[0].style.backgroundColor = "#DF013A";
      $event.currentTarget.offsetParent.parentElement.children[1].children[0].style.backgroundColor = "red";
    } else {
      const $status = document.getElementsByClassName("status")[index] as any;
      const $statusCall = document.getElementsByClassName("statusCall")[index].getElementsByClassName("action-circle")[0] as any;
      $status.style.backgroundColor = "#DF013A";
      $statusCall.style.backgroundColor = "red";
    }
  }

    setAccept($event, callId, clientId, index = null) {
        let comentControler = $event.currentTarget.offsetParent.children[0].value;

        this.http.get('api/conroler/ClientAccept/DefaultCall?comment=' + comentControler + "&callId=" + callId + "&clientId=" + clientId).subscribe();

        this.data.find(c => c.id == callId && c.clientId == clientId).callsComments.acceptControlerCalss = acceptControlerCalss.Default;
        this.data.find(c => c.id == callId && c.clientId == clientId).statusContact = 0;
        
        let cientAcceptOne = this.data.find(c => c.id == callId);
        let color = '';

        if (cientAcceptOne.contactType == 0) {
            color = '#e5e5e5';}
        else if (cientAcceptOne.contactType == 10)
            color = '#FF1493'
        else if (cientAcceptOne.contactType == 20)
            color = '#B0ECDD'
        else if (cientAcceptOne.contactType == 30)
            color = '#FDE488'
        else if (cientAcceptOne.contactType == 40)
            color = '#00FF7F'
        else if (cientAcceptOne.contactType == 60)
            color = '#58FA82'

        if (!this._isMobile()) {
            $event.currentTarget.offsetParent.parentElement.children[0].style.backgroundColor = "#FAFAFA";
            $event.currentTarget.offsetParent.parentElement.children[1].children[0].style.backgroundColor = color;
        } else {
            const $status = document.getElementsByClassName("status")[index] as any;
            const $statusCall = document.getElementsByClassName("statusCall")[index].getElementsByClassName("action-circle")[0] as any;

            $status.style.backgroundColor = "#FAFAFA";
            $statusCall.style.backgroundColor = color;
        }
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

    msToTime(duration) {
        var d, h, m, s;
        s = duration;
        m = Math.floor(s / 60);
        s = s % 60;
        h = Math.floor(m / 60);
        m = m % 60;
        d = Math.floor(h / 24);
        h = h % 24;
        h += d * 24;
        return h + ':' + m + ':' + s;
    }

  playAudio($event, id, audioSrc) {
    if (this.audioPlayId == id || this.audioPlayId != 0 || this.audioPlay) {
      this.audioPlay.pause();
      this.audioPlay = null;
      this.audioPlayId = 0;
    }
    else {
      if (!audioSrc) {
        return;
      }

      this.audioPlay = new Audio(audioSrc);
      this.audioPlay.play();
      this.audioPlayId = id;
    }
  }

  _display_audio_icon(id) {
    return this.audioPlayId == id ? '../../../../../Icon/pause.png' : '../../../../../Icon/play.png';
  }

  constructor(public dialogRef: MatDialogRef<AcceptManagerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ClientAccept[],
    private http: HttpClient) {
    console.log(data);
  }

  ngOnInit() {
  }

  _isMobile() {
    return window.innerWidth < 920;
  }

}
