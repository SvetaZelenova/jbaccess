import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from "@angular/forms";
import {MessageService} from "primeng/api";

import { AdminRoutingModule} from "./admin-routing.module";
import { PersonnelComponent } from './personnel/personnel.component';
import { PlacesComponent } from './places/places.component';
import { AdminComponent } from "./admin.component";

import { CoreModule } from "../core/core.module";
import { SharedModule} from "../shared/shared.module";
import { PersonDetailComponent } from './person-detail/person-detail.component';
import {KeysComponent} from "./keys/keys.component";

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule
  ],
  declarations: [
    AdminComponent,
    PersonnelComponent,
    PlacesComponent,
    PersonDetailComponent,
    KeysComponent
  ],
  providers: [
    MessageService
  ]
})
export class AdminModule { }
