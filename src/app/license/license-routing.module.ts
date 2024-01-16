import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LicenseListComponent } from './license-list/license-list.component';
import { MsalGuard } from '@azure/msal-angular';

const routes: Routes = [
  {
    path: 'list',
    component: LicenseListComponent,
    canActivate: [MsalGuard],
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LicenseRoutingModule { }
