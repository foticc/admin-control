import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SFSchema, SFUISchema } from '@delon/form';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { SHARED_IMPORTS } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';

import { UserDetail } from '../../model';
import { UserBindRoleComponent } from '../bindrole/user-bind-role.component';

@Component({
  selector: 'app-user-userlist-edit',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './edit.component.html'
})
export class UserlistEditComponent implements OnInit {
  record: UserDetail = {};
  i = {};
  allRoles: Array<{ id: number; name: string }> = [];
  form = this.fb.group({
    id: null,
    username: '',
    nickName: '',
    email: '',
    phone: '',
    roles: [],
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
    required: ['username']
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
    private fb: FormBuilder,
    private modal: ModalHelper,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.http.get(`/user/list/${id}`).subscribe(res => this.form.patchValue(res));
    }
    // this.form.patchValue({ username: '123' });
    this.http.get('/role/list').subscribe(res => {
      this.allRoles = res;
    });
  }

  save(): void {
    // this.http.post(`/user/${this.record.id}`, this.form).subscribe(res => {
    //   this.msgSrv.success('保存成功');
    //   this.back();
    // });
    // console.log(this.form);
    // this.msgSrv.success('保存成功');
    // this.modal.close(true);
    console.log(this.form);
  }

  back(): void {
    this.location.back();
  }

  close(): void {
    // this.modal.destroy();
    this.back();
  }

  compareFn(c1: { id: number; name: string }, c2: number): boolean {
    return c1 && c2 ? c1.id === c2 : c1.id === c2;
  }

  bind(): void {
    this.modal.createStatic(UserBindRoleComponent).subscribe(s => {});
  }
}
