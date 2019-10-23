import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ControlerComponent } from './controler.component';
import { AcceptManagerComponent } from './Calls/components/acceptManager/acceptManager.component';
import { ReportCallComponent } from './report/component/report-call/report-call.component';
import { ClientAcceptComponent } from './clients-accept/client-accept/client-accept.component';

const controlerRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'calls' },
  { path: 'calls', component: AcceptManagerComponent },
  { path: 'report', component: ReportCallComponent },
  { path: 'clients', component: ClientAcceptComponent },
]

const routes: Routes = [
  { path: '', component: ControlerComponent, children: controlerRoutes },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlerRoutingModule { }
