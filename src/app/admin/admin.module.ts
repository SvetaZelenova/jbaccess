import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { AdminRoutingModule } from './admin-routing.module';
import { PersonnelComponent } from './personnel/personnel.component';
import { PlacesComponent } from './places/places.component';
import { AdminComponent } from './admin.component';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { PersonDetailComponent } from './person-detail/person-detail.component';
import { KeysComponent } from './keys/keys.component';
import { ConfirmationService } from 'primeng/api';
import { DoorsComponent } from './doors/doors.component';
import { RolesComponent } from './roles/roles.component';
import { ControllersComponent } from './controllers/controllers.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule,
    FormsModule
  ],
  declarations: [
    AdminComponent,
    PersonnelComponent,
    PlacesComponent,
    PersonDetailComponent,
    KeysComponent,
    DoorsComponent,
    RolesComponent,
    ControllersComponent
  ],
  providers: [MessageService, ConfirmationService]
})
export class AdminModule {}
