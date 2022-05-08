import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GatewaysComponent } from './Components/gateways/gateways.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { EditGatewayComponent } from './Components/edit-gateway/edit-gateway.component';
import { PeripheralsComponent } from './Components/peripherals/peripherals.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditPeripheralComponent } from './Components/edit-peripheral/edit-peripheral.component';
import { ToastMessagesComponent } from './Components/toast-messages/toast-messages.component';

@NgModule({
  declarations: [
    AppComponent,
    GatewaysComponent,
    EditGatewayComponent,
    PeripheralsComponent,
    EditPeripheralComponent,
    ToastMessagesComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
