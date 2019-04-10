import { Routes, RouterModule } from "@angular/router";
import { ClientComponent } from './containers/client/client.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    { path: '', redirectTo: 'client', pathMatch: 'full' },
    { path: 'client', component: ClientComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagerRoutingModule {}