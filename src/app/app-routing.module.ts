import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin/admin.component';
import {PersonnelComponent} from './personnel/personnel.component';
import {PlacesComponent} from './places/places.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './auth.guard';
import {KeysComponent} from './keys/keys.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {path: 'person', component: PersonnelComponent},
      {path: 'keys', component: KeysComponent},
      {path: 'places', component: PlacesComponent}
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
