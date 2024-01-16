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
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ManualLicenseRequestComponent,
    AutomatedLicenseRequestComponent
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







  ]
})
export class LicenseModule { }