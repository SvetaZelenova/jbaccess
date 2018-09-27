import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {TableModule} from 'primeng/table';
import {MenuModule} from 'primeng/menu';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {ListboxModule} from 'primeng/listbox';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';

@NgModule({
  imports: [
    CommonModule,
    TableModule,
    MenuModule,
    ButtonModule,
    DialogModule,
    ListboxModule,
    ToastModule,
  ],
  declarations: []
})
export class PrimengModule {
  static forRoot() {
    return {
      ngModule: PrimengModule,
      providers: [ MessageService ]
    }
  }
}
