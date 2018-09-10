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
import { ApiModule, BASE_PATH, Configuration, ConfigurationParameters } from '@anatolyua/jbaccess-client-open-api';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment'

export function apiConfigFactory (): Configuration  {
  const params: ConfigurationParameters = {
    basePath: environment.API_BASE_PATH,
    withCredentials: true
  }
  return new Configuration(params);
}

@NgModule({
  declarations: [
    AppComponent,
    PlacesComponent,
    PersonnelComponent
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
    ApiModule.forRoot(apiConfigFactory)
  ],
  providers: [], //{ provide: BASE_PATH, useValue: environment.API_BASE_PATH }
  bootstrap: [AppComponent]
})
export class AppModule { }
