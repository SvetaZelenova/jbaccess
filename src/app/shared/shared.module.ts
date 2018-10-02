import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {TableModule} from 'primeng/table';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {ToastModule} from 'primeng/toast';
import {ListboxModule} from 'primeng/listbox';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ToolbarModule} from 'primeng/toolbar';

@NgModule({

  imports: [
    CommonModule,
    TableModule,
    AngularFontAwesomeModule,
    ButtonModule,
    DialogModule,
    ListboxModule,
    ToastModule,
    MessageModule,
    MessagesModule,
    ConfirmDialogModule,
    ToolbarModule
  ],
  declarations: [],
  exports: [
    TableModule,
    AngularFontAwesomeModule,
    ButtonModule,
    DialogModule,
    ListboxModule,
    ToastModule,
    MessageModule,
    MessagesModule,
    ConfirmDialogModule,
    ToolbarModule
  ]
})
export class SharedModule { }
