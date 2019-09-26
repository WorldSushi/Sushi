import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ControlerComponent } from './controler.component';
import { AcceptManagerComponent } from './clients/components/acceptManager/acceptManager.component';

const controlerRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'AcceptManager' },
  { path: 'AcceptManager', component: AcceptManagerComponent },
]

const routes: Routes = [
  { path: '', component: ControlerComponent, children: controlerRoutes },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlerRoutingModule { }
