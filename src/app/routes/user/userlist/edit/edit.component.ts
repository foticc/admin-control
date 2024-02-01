import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalHelper } from '@delon/theme';
import { SHARED_IMPORTS } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';

import { RoleApiService } from '../../apis/role.api.service';
import { UserApiService } from '../../apis/user.api.service';
import { BindRoleComponent } from '../../bindrole/bind-role.component';
import { Role } from '../../model';

@Component({
  selector: 'app-user-userlist-edit',
  standalone: true,
  imports: [...SHARED_IMPORTS, BindRoleComponent, JsonPipe],
  templateUrl: './edit.component.html'
})
export class UserlistEditComponent implements OnInit {
  record: any = {};
  i = {};
  allRoles: Role[] = [];
  form = this.fb.group({
    id: null,
    username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
    nickName: [''],
    email: ['', [Validators.email]],
    phone: [''],
    roles: [[], [Validators.required]],
    accountExpired: false,
    accountLocked: false,
    enable: true
  });

  constructor(
    private fb: UntypedFormBuilder,
    private modal: ModalHelper,
    private msgSrv: NzMessageService,
    private route: ActivatedRoute,
    private router: Router,
    private userApiService: UserApiService,
    private roleApiService: RoleApiService
  ) {}

  ngOnInit(): void {
    this.roleApiService.list().subscribe(res => {
      this.allRoles = res.data;
    });
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userApiService.getUser(Number(id)).subscribe(res => {
        this.record = res.data;
        this.form.setValue(res.data);
      });
    }
  }

  save(): void {
    if (this.form.valid) {
      this.userApiService.saveUser(this.form.getRawValue()).subscribe(res => {
        if (res.code === 200) {
          this.msgSrv.success('保存成功');
          this.back();
        }
      });
    }
  }

  back(): void {
    this.router.navigateByUrl('/user/user');
  }

  close(): void {
    // this.modal.destroy();
    this.back();
  }

  compareFn(c1: Role, c2: number): boolean {
    return c1 && c2 ? c1.id === c2 : c1.id === c2;
  }
}
