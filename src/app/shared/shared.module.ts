import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {TableModule} from 'primeng/table';
import {AngularFontAwesomeModule} from "angular-font-awesome";
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {ToastModule} from 'primeng/toast';
import {ListboxModule} from 'primeng/listbox';
@NgModule({

  imports: [
    CommonModule,
    TableModule,
    AngularFontAwesomeModule,
    ButtonModule,
    DialogModule,
    ToastModule,
    ListboxModule
  ],
  declarations: [],
  exports: [
    TableModule,
    AngularFontAwesomeModule,
    ButtonModule,
    DialogModule,
    ToastModule,
    ListboxModule
  ]
})
export class SharedModule { }
