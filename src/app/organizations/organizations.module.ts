import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationsRoutingModule } from './organizations-routing.module';
import { OrganizationsListComponent } from './organizations-list/organizations-list.component';
import { OrganizationsAddComponent } from './organizations-add/organizations-add.component';
import { OrganizationsUpdateComponent } from './organizations-update/organizations-update.component';


@NgModule({
  declarations: [
    OrganizationsListComponent,
    OrganizationsAddComponent,
    OrganizationsUpdateComponent
  ],
  imports: [
    CommonModule,
    OrganizationsRoutingModule
  ]
})
export class OrganizationsModule { }
