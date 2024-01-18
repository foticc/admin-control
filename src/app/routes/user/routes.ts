import { Routes } from '@angular/router';
import { RouteTitle } from '@delon/theme';

import { UserMenuComponent } from './menu/menu.component';
import { PermissionComponent } from './permission/permission.component';
import { RolelistComponent } from './rolelist/rolelist.component';
import { UserlistEditComponent } from './userlist/edit/edit.component';
import { UserlistComponent } from './userlist/userlist.component';

export const routes: Routes = [
  {
    path: 'user',
    component: UserlistComponent
  },
  {
    path: 'user/:id',
    component: UserlistEditComponent,
    data: { title: '编辑', titleI18n: 'page-name' } as RouteTitle
  },
  { path: 'role', component: RolelistComponent },
  { path: 'permission', component: PermissionComponent },
  { path: 'menu', component: UserMenuComponent }
];
