import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {PersonnelComponent} from "./personnel/personnel.component";
import {PlacesComponent} from "./places/places.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  {
    path: 'person',
    component: PersonnelComponent
  },
  {
    path: 'places',
    component: PlacesComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
