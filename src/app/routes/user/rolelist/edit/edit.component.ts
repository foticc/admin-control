import { Component, OnInit } from '@angular/core';
import { SFSchema, SFUISchema } from '@delon/form';
import { SHARED_IMPORTS } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

import { RoleApiService } from '../../apis/role.api.service';

@Component({
  selector: 'app-user-rolelist-edit',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './edit.component.html'
})
export class RolelistEditComponent implements OnInit {
  record: any = {};
  i: any;
  schema: SFSchema = {
    properties: {
      name: { type: 'string', title: '名称', maxLength: 15 }
    },
    required: ['name']
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 }
    },
    $id: {
      widget: 'text'
    },
    $name: {
      widget: 'string'
    }
  };

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public roleApiService: RoleApiService
  ) {}

  ngOnInit(): void {
    console.log(this.record);
  }

  save(value: any): void {
    let observable;
    if (value.id) {
      console.log(value);
      observable = this.roleApiService.updateRole(value);
    } else {
      console.log(value);
      observable = this.roleApiService.saveRole(value);
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
