import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

import {PersonnelComponent} from "./personnel/personnel.component";
import {PlacesComponent} from "./places/places.component";
import {AdminComponent} from "./admin.component";
import {PersonDetailComponent} from "./person-detail/person-detail.component";
import {AuthGuard} from "../core/auth/auth.guard";
import {KeysComponent} from "./keys/keys.component";

const routes: Routes = [
  {
    path: '', component: AdminComponent,
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
            path: 'person/:id',
            component: PersonDetailComponent
          },
          {
            path: 'places',
            component: PlacesComponent
          },
          {
            path: 'keys',
            component: KeysComponent
          }
        ]
      }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
