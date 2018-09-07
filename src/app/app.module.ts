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
import { AppRoutingModule } from './/app-routing.module';
import { HttpClientModule} from "@angular/common/http";
import { ReactiveFormsModule} from "@angular/forms";

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
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
