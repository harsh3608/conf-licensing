import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationsRoutingModule } from './organizations-routing.module';
import { OrganizationsListComponent } from './organizations-list/organizations-list.component';
import { OrganizationsAddComponent } from './organizations-add/organizations-add.component';
import { OrganizationsUpdateComponent } from './organizations-update/organizations-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenubarModule } from 'primeng/menubar';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { StyleClassModule } from 'primeng/styleclass';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    OrganizationsListComponent,
    OrganizationsAddComponent,
    OrganizationsUpdateComponent
  ],
  imports: [
    CommonModule,
    OrganizationsRoutingModule,
    FormsModule,
    ReactiveFormsModule,


    StyleClassModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    SidebarModule,
    BadgeModule,
    RadioButtonModule,
    InputSwitchModule,
    TooltipModule,
    MenubarModule,
    AvatarModule,
    TableModule,
    ProgressBarModule,
    CalendarModule,
    MultiSelectModule,
    DropdownModule,
    InputTextareaModule,
    DynamicDialogModule,
    InputNumberModule,
    DialogModule,
    ToastModule,
  ],
  providers: [
    MessageService,
    DialogService,
    DynamicDialogRef,
  ]
})
export class OrganizationsModule { }
