import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LicenseListComponent } from './license-list/license-list.component';
import { MsalGuard } from '@azure/msal-angular';
import { ManualLicenseRequestComponent } from './manual-license-request/manual-license-request.component';
import { AutomatedLicenseRequestComponent } from './automated-license-request/automated-license-request.component';

const routes: Routes = [
  {
    path: 'list',
    component: LicenseListComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'manual-license-request',
    component: ManualLicenseRequestComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'automated-license-request',
    component: AutomatedLicenseRequestComponent,
    canActivate: [MsalGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LicenseRoutingModule { }
