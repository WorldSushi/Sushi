import { NgModule } from "@angular/core";
import { ClientComponent } from './containers/client/client.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { ClientEffects } from './store/effects/client.effects';
import { CLientService } from './services/client.service';
import { managerReducer } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { ManagerRoutingModule } from './manager-routing.module';

@NgModule({
    declarations: [ClientComponent, ClientListComponent],
    imports: [
        CommonModule,
        ManagerRoutingModule,
        HttpClientModule,
        StoreModule.forFeature('manager', managerReducer),
        EffectsModule.forFeature([ClientEffects])
    ],
    providers: [CLientService]
})
export class ManagerModule {}