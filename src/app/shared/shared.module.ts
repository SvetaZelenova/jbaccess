import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ListboxModule } from 'primeng/listbox';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToolbarModule } from 'primeng/toolbar';
import { TabViewModule } from 'primeng/tabview';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { RelationsComponent } from './relations/relations.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    AngularFontAwesomeModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
    ListboxModule,
    ToastModule,
    MessageModule,
    MessagesModule,
    ConfirmDialogModule,
    ToolbarModule,
    TabViewModule,
    InputSwitchModule
  ],
  declarations: [RelationsComponent],
  exports: [
    TableModule,
    AngularFontAwesomeModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
    ListboxModule,
    ToastModule,
    MessageModule,
    MessagesModule,
    ConfirmDialogModule,
    ToolbarModule,
    TabViewModule,
    InputSwitchModule,
    RelationsComponent
  ]
})
export class SharedModule {}
