import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {TableModule} from 'primeng/table';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {MenuModule} from 'primeng/menu';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {ListboxModule} from 'primeng/listbox';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';

import { AppComponent } from './app.component';
import { PlacesComponent } from './places/places.component';
import { PersonnelComponent } from './personnel/personnel.component';
import { AppRoutingModule } from './app-routing.module';
import { ApiModule, Configuration, ConfigurationParameters } from '@anatolyua/jbaccess-client-open-api';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import {LoginService} from './login/login.service';
import { KeysComponent } from './keys/keys.component';
import { KeysService } from './keys/keys.service';
import {HttpErrorHandler} from './core/http-error-handler.service';
import {AuthInterceptor} from './auth.interceptor';

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
    PersonnelComponent,
    LoginComponent,
    AdminComponent,
    KeysComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    TableModule,
    MenuModule,
    ButtonModule,
    DialogModule,
    ListboxModule,
    ToastModule,
    AppRoutingModule,
    HttpClientModule,
    ApiModule.forRoot(apiConfigFactory),
    ReactiveFormsModule
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
