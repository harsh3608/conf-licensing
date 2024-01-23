import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LicenseListComponent } from './license-list/license-list.component';
import { MsalGuard } from '@azure/msal-angular';
import { ApprovedLicenseListComponent } from './approved-license-list/approved-license-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: LicenseListComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'approved-license-list',
    component: ApprovedLicenseListComponent,
    canActivate: [MsalGuard],
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LicenseRoutingModule { }
