import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

import {PersonnelComponent} from "./personnel/personnel.component";
import {PlacesComponent} from "./places/places.component";
import {AdminComponent} from "./admin.component";

const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      {
        path: 'person',
        component: PersonnelComponent
      },
      {
        path: 'places',
        component: PlacesComponent
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
