import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RootStoreModule } from './store/root-store.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminGuard } from './shared/guards/admin.guard';
import { DateExtensionsService } from './shared/services/date-extensions.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ClientTypeTranslatePipe } from './store/shared/pipes/client-type-translate-pipe';
import { ClientGroupTranslatePipe } from './store/shared/pipes/client-group-translate.pipe';
import { NumberOfShipmentsTranslatePipe } from './store/shared/pipes/number-of-shipments-pipe';
import { NumberOfCallsTranslatePipe } from './store/shared/pipes/number-of-calls-pipe';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RootStoreModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
