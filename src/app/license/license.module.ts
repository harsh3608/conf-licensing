import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LicenseRoutingModule } from './license-routing.module';
import { ManualLicenseRequestComponent } from './manual-license-request/manual-license-request.component';
import { AutomatedLicenseRequestComponent } from './automated-license-request/automated-license-request.component';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TooltipModule } from 'primeng/tooltip';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { LicenseListComponent } from './license-list/license-list.component';
import { ApprovedLicenseListComponent } from './approved-license-list/approved-license-list.component';
import { UpdateApprovedLicenseComponent } from './update-approved-license/update-approved-license.component';
import { AddOrganizationComponent } from './add-organization/add-organization.component';
import { ShowGeneratedLicenseComponent } from './show-generated-license/show-generated-license.component';


@NgModule({
  declarations: [
    ManualLicenseRequestComponent,
    AutomatedLicenseRequestComponent,
    LicenseListComponent,
    ApprovedLicenseListComponent,
    UpdateApprovedLicenseComponent,
    AddOrganizationComponent,
    ShowGeneratedLicenseComponent
  ],
  imports: [
    CommonModule,
    LicenseRoutingModule,
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
export class LicenseModule { }
