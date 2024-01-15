import { Routes } from '@angular/router';

import { PermissionComponent } from './permission/permission.component';
import { RolelistComponent } from './rolelist/rolelist.component';
import { UserlistComponent } from './userlist/userlist.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full'
  },
  { path: 'user', component: UserlistComponent },
  { path: 'role', component: RolelistComponent },
  { path: 'permission', component: PermissionComponent }
];
