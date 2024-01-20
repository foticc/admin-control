import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { STColumn, STComponent } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper } from '@delon/theme';
import { SHARED_IMPORTS } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';

import { UserlistViewComponent } from './view/view.component';
import { UserApiService } from '../apis/user.api.service';

@Component({
  selector: 'app-user-userlist',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './userlist.component.html'
})
export class UserlistComponent implements OnInit, OnDestroy {
  url = '/api/user/page';
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
    { title: '编号', type: 'no' },
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
          }
        },
        { text: '编辑', type: 'link', click: (item: any) => `/user/user/${item.id}` },
        {
          text: '删除',
          type: 'del',
          click: (item: any) => this.deleteUser(item)
        }
      ]
    }
  ];

  constructor(
    private userService: UserApiService,
    private modal: ModalHelper,
    private router: Router,
    private msgSrv: NzMessageService
  ) {}

  ngOnInit(): void {
    //nothing
    console.log('ngOnInit');
  }

  add(): void {
    // this.modal.createStatic(UserlistEditComponent, { i: { id: 0 } }).subscribe(() => this.st.reload());
    this.router.navigateByUrl('/user/user/');
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
  }

  deleteUser(item: any) {
    this.userService.deleteUser(item.id).subscribe(res => {
      if (res.data > 0) {
        this.msgSrv.success('删除成功');
        this.st.reload();
      } else {
        this.msgSrv.success('删除失败');
      }
    });
  }
}
