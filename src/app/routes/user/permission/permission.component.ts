import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper } from '@delon/theme';
import { SHARED_IMPORTS } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';

import { PermissionEditComponent } from './edit/edit.component';
import { PermissionViewComponent } from './view/view.component';
import { PermsApiService } from '../apis/perms.api.service';
import { RoleApiService } from '../apis/role.api.service';

@Component({
  selector: 'app-user-permission',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './permission.component.html'
})
export class PermissionComponent implements OnInit {
  url = `/api/perms/page`;
  searchSchema: SFSchema = {
    properties: {
      path: {
        type: 'string',
        title: '路径'
      }
    }
  };
  @ViewChild('st') private readonly st!: STComponent;
  columns: STColumn[] = [
    { title: '编号', type: 'no' },
    { title: '路径', type: 'link', index: 'path' },
    {
      title: '',
      buttons: [
        {
          text: '查看',
          type: 'static',
          modal: {
            component: PermissionViewComponent
          }
        },
        {
          text: '编辑',
          type: 'static',
          modal: {
            component: PermissionEditComponent
          },
          click: 'reload'
        },
        {
          text: '删除',
          type: 'del',
          click: (item: any) => this.delete(item)
        }
      ]
    }
  ];

  constructor(
    private modal: ModalHelper,
    private msgSrv: NzMessageService,
    private roleApiService: RoleApiService,
    private permsApiService: PermsApiService
  ) {}

  ngOnInit(): void {
    console.log('init');
  }

  add(): void {
    this.modal.createStatic(PermissionEditComponent).subscribe(() => this.st.reload());
  }

  delete(item: any) {
    this.permsApiService.deletePerms(item.id).subscribe(res => {
      this.msgSrv.success('删除成功');
      this.st.reload();
    });
  }
}
