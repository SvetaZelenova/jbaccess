import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthComponent } from './auth/auth.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './interceptors/error-handler.interceptor';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ButtonModule],
  declarations: [
    HeaderComponent,
    SideNavComponent,
    AuthComponent,
    PageNotFoundComponent
  ],
  exports: [HeaderComponent, SideNavComponent, PageNotFoundComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ]
})
export class CoreModule {}
