import { Routes, RouterModule } from "@angular/router";
import { ClientComponent } from './containers/client/client.component';
import { NgModule } from '@angular/core';
import { ManagerComponent } from "./manager.component";


const managerRoutes: Routes = [
    { path: '', redirectTo: 'users', pathMatch: 'full'},
    { path: 'clients', component: ClientComponent }
]

const routes: Routes = [
    { path: '', 
        component: ManagerComponent, 
        children: managerRoutes
    }
  
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagerRoutingModule {}