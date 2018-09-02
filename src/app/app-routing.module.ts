import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {PersonnelComponent} from "./personnel/personnel.component";
import {PlacesComponent} from "./places/places.component";

const routes: Routes = [
  { path: '', component: PersonnelComponent},
  { path: 'places', component: PlacesComponent}
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
