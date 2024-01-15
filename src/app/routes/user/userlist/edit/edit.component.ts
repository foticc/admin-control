import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { SFSchema, SFUISchema } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { SHARED_IMPORTS } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

import { UserDetail } from '../../model';

@Component({
  selector: 'app-user-userlist-edit',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './edit.component.html'
})
export class UserlistEditComponent implements OnInit {
  record: UserDetail = {};
  i = {};
  form = this.fb.group({
    id: null,
    username: '',
    nickName: '',
    email: '',
    phone: '',
    roles: '',
    accountExpired: '',
    accountLocked: '',
    enable: ''
  });
  schema: SFSchema = {
    properties: {
      id: { type: 'string', title: '编号' },
      username: { type: 'string', title: '用户名', maxLength: 100 },
      nickName: { type: 'string', title: '昵称' },
      email: { type: 'string', title: 'email', format: 'email' },
      phone: { type: 'string', title: 'phone', maxLength: 140 },
      roles: { type: 'string', title: '角色', maxLength: 140 },
      accountExpired: { type: 'boolean', title: 'Expired', maxLength: 140 },
      accountLocked: { type: 'boolean', title: 'Locked', maxLength: 140 },
      enable: { type: 'boolean', title: 'enable', maxLength: 140 }
    },
    required: ['owner', 'callNo', 'href', 'description']
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 }
    },
    $no: {
      widget: 'text'
    },
    $href: {
      widget: 'string'
    },
    $description: {
      widget: 'textarea',
      grid: { span: 24 }
    }
  };

  constructor(
    private fb: NonNullableFormBuilder,
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient
  ) {}

  ngOnInit(): void {
    if (this.record.id != null) {
      this.http.get(`/user/list/${this.record.id}`).subscribe(res => this.form.patchValue(res));
    }
    // this.form.patchValue({ username: '123' });
  }

  save(): void {
    // this.http.post(`/user/${this.record.id}`, value).subscribe(res => {
    //   this.msgSrv.success('保存成功');
    //   this.modal.close(true);
    // });
    console.log(this.form);
    this.msgSrv.success('保存成功');
    this.modal.close(true);
  }

  close(): void {
    this.modal.destroy();
  }
}
