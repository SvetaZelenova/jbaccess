import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ApiModule, Configuration, ConfigurationParameters } from '@anatolyua/jbaccess-client-open-api';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { ReactiveFormsModule} from "@angular/forms";
import {CoreModule} from "./core/core.module";
import {AdminModule} from "./admin/admin.module";
import {SharedModule} from "./shared/shared.module";

export function apiConfigFactory (): Configuration  {
  const params: ConfigurationParameters = {
    basePath: environment.API_BASE_PATH,
    withCredentials: true
  }
  return new Configuration(params);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ApiModule.forRoot(apiConfigFactory),
    ReactiveFormsModule,
    CoreModule,
    AdminModule,
    SharedModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    LoginService,
    KeysService,
    HttpErrorHandler,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
