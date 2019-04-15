import { Routes, RouterModule } from "@angular/router";
import { ClientComponent } from './containers/client/client.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    { path: '', redirectTo: 'clients', pathMatch: 'full' },
    { path: 'clients', component: ClientComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagerRoutingModule {}