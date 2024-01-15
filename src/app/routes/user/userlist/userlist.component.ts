import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper } from '@delon/theme';
import { SHARED_IMPORTS } from '@shared';

import { UserlistEditComponent } from './edit/edit.component';
import { UserApiService } from './user.api.service';
import { UserlistViewComponent } from './view/view.component';

@Component({
  selector: 'app-user-userlist',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './userlist.component.html'
})
export class UserlistComponent implements OnInit {
  url = `/user/list`;
  searchSchema: SFSchema = {
    properties: {
      no: {
        type: 'string',
        title: '编号1'
      }
    }
  };
  @ViewChild('st') private readonly st!: STComponent;
  columns: STColumn[] = [
    { title: '编号', index: 'id' },
    { title: '用户名', index: 'username' },
    { title: '昵称', width: '50px', index: 'nickName' },
    { title: 'email', index: 'email' },
    { title: 'phone', index: 'phone' },
    { title: 'accountExpired', index: 'accountExpired' },
    { title: 'accountLocked', index: 'accountLocked' },
    { title: 'enable', type: 'yn', index: 'enable' },
    {
      title: '',
      buttons: [
        {
          text: '查看',
          type: 'static',
          modal: {
            component: UserlistViewComponent,
            params: item => {
              return { i: item.id };
            }
          },
          click: (item: any) => `/user/list/${item.id}`
        },
        { text: '编辑', type: 'modal', modal: { component: UserlistEditComponent }, click: 'reload' }
      ]
    }
  ];

  constructor(
    private userService: UserApiService,
    private modal: ModalHelper
  ) {}

  ngOnInit(): void {
    this.userService.listPage({
      size: 5,
      page: 1
    });
  }

  add(): void {
    this.modal.createStatic(UserlistEditComponent, { i: { id: 0 } }).subscribe(() => this.st.reload());
  }
}
