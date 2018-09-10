import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {TableModule} from 'primeng/table';
import {AngularFontAwesomeModule} from "angular-font-awesome";
import {MenuModule} from 'primeng/menu';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';

import { AppComponent } from './app.component';
import { PlacesComponent } from './places/places.component';
import { PersonnelComponent } from './personnel/personnel.component';
import { AppRoutingModule } from './app-routing.module';
import { ApiModule, BASE_PATH } from '@anatolyua/jbaccess-client-open-api';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import {LoginService} from "./login/login.service";
import {AccessDataService} from "./access-data.service";

@NgModule({
  declarations: [
    AppComponent,
    PlacesComponent,
    PersonnelComponent,
    LoginComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    TableModule,
    MenuModule,
    ButtonModule,
    DialogModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ApiModule
  ],
  providers: [{ provide: BASE_PATH, useValue: environment.API_BASE_PATH },
              LoginService, AccessDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
