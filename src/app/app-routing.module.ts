import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { BrowserUtils } from '@azure/msal-browser';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { LicenseListComponent } from './license/license-list/license-list.component';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [MsalGuard],
  },

  {
    path: 'license',
    loadChildren: () => import('./license/license.module').then(m => m.LicenseModule)
  },
  {
    path: 'organizations',
    loadChildren: () => import('./organizations/organizations.module').then(m => m.OrganizationsModule)
  },
  {
    path: '',
    component: HomeComponent,
  },
  
  {
    // Needed for Error routing
    path: 'error',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // Don't perform initial navigation in iframes or popups
      initialNavigation:
        !BrowserUtils.isInIframe() && !BrowserUtils.isInPopup()
          ? 'enabledNonBlocking'
          : 'disabled', // Set to enabledBlocking to use Angular Universal
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }

