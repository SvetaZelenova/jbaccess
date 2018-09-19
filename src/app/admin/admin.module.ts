import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from "@angular/forms";

import {TableModule} from 'primeng/table';
import {AngularFontAwesomeModule} from "angular-font-awesome";
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';

import { AdminRoutingModule} from "./admin-routing.module";
import { PersonnelComponent } from './personnel/personnel.component';
import { PlacesComponent } from './places/places.component';
import { AdminComponent } from "./admin.component";

import { CoreModule } from "../core/core.module";

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    TableModule,
    AngularFontAwesomeModule,
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
    CoreModule
  ],
  declarations: [
    AdminComponent,
    PersonnelComponent,
    PlacesComponent
  ]
})
export class AdminModule { }
