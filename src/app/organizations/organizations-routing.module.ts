import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationsListComponent } from './organizations-list/organizations-list.component';
import { MsalGuard } from '@azure/msal-angular';

const routes: Routes = [
  {
    path: 'list',
    component: OrganizationsListComponent,
    canActivate: [MsalGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationsRoutingModule { }
