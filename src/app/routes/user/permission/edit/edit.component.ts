import { Component, OnInit } from '@angular/core';
import { SFSchema, SFUISchema } from '@delon/form';
import { SHARED_IMPORTS } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

import { PermsApiService } from '../../apis/perms.api.service';

@Component({
  selector: 'app-user-permission-edit',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './edit.component.html'
})
export class PermissionEditComponent implements OnInit {
  record: any = {};
  i: any;
  schema: SFSchema = {
    properties: {
      path: { type: 'string', title: '路径' }
    },
    required: ['path']
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 }
    },
    path: {
      widget: 'text'
    }
  };

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public permsApiService: PermsApiService
  ) {}

  ngOnInit(): void {
    console.log('init');
  }

  save(value: any): void {
    let observable;
    if (value.id) {
      observable = this.permsApiService.updatePerms(value);
    } else {
      observable = this.permsApiService.savePerms(value);
    }
    observable.subscribe(res => {
      if (res.data.id) {
        this.msgSrv.success('保存成功');
        this.modal.close(true);
      } else {
        this.msgSrv.error('保存失败');
      }
    });
  }

  close(): void {
    this.modal.destroy();
  }
}
