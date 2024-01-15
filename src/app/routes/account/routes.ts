import { Routes } from '@angular/router';

import { AccountSettingsBaseComponent } from './settings/base/base.component';
import { AccountSettingsBindingComponent } from './settings/binding/binding.component';
import { AccountSettingsNotificationComponent } from './settings/notification/notification.component';
import { AccountSettingsSecurityComponent } from './settings/security/security.component';
import { AccountSettingsComponent } from './settings/settings.component';

export const routes: Routes = [
  {
    path: '',
    component: AccountSettingsComponent,
    children: [
      { path: '', redirectTo: 'base', pathMatch: 'full' },
      { path: 'base', component: AccountSettingsBaseComponent },
      { path: 'binding', component: AccountSettingsBindingComponent },
      { path: 'notification', component: AccountSettingsNotificationComponent },
      { path: 'security', component: AccountSettingsSecurityComponent }
    ]
  }
];
