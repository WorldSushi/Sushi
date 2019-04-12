import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './containers/user/user.component';
import { AdminComponent } from './admin.component';

const adminRoutes: Routes = [
    { path: '', redirectTo: 'users', pathMatch: 'full'},
    { path: 'users', component: UserComponent }
]

const routes: Routes = [
    { path: '', 
        component: AdminComponent, 
        children: adminRoutes
    }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
