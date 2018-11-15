import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PersonnelComponent } from './personnel/personnel.component';
import { PlacesComponent } from './places/places.component';
import { AdminComponent } from './admin.component';
import { AuthGuard } from '../core/auth/auth.guard';
import { KeysComponent } from './keys/keys.component';
import { DoorsComponent } from './doors/doors.component';
import { RolesComponent } from './roles/roles.component';
import { ControllersComponent } from './controllers/controllers.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: 'person',
            component: PersonnelComponent
          },
          {
            path: 'places',
            component: PlacesComponent
          },
          {
            path: 'keys',
            component: KeysComponent
          },
          {
            path: 'doors',
            component: DoorsComponent
          },
          {
            path: 'roles',
            component: RolesComponent
          },
          {
            path: 'controllers',
            component: ControllersComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
