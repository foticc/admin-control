import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { SFValue } from '@delon/form/src/interface';
import { SFSchemaEnum, SFSchemaEnumType } from '@delon/form/src/schema';
import { SHARED_IMPORTS } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { mergeMap, Observable, of } from 'rxjs';

import { PermsApiService } from '../../apis/perms.api.service';
import { RoleApiService } from '../../apis/role.api.service';
import { BindRoleComponent } from '../../bindrole/bind-role.component';
import { PermissionVo } from '../../model';

@Component({
  selector: 'app-user-permission-edit',
  standalone: true,
  imports: [...SHARED_IMPORTS, BindRoleComponent],
  templateUrl: './edit.component.html'
})
export class PermissionEditComponent implements OnInit {
  record: any = {};
  i: PermissionVo = {} as PermissionVo;

  constructor(
    private fb: UntypedFormBuilder,
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    private roleApiService: RoleApiService,
    public permsApiService: PermsApiService
  ) {}

  ngOnInit(): void {
    if (this.record.id) {
      this.permsApiService.getPerms(this.record.id).subscribe(res => {
        this.i = res.data;
      });
    }
  }

  save(): void {
    let value = this.i;
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

  loadSearch(): Observable<SFSchemaEnumType[]> {
    return this.roleApiService.list().pipe(
      mergeMap(m => {
        let map = m.data.map(v => {
          return { label: v.name, value: v.id };
        });
        return of(map);
      })
    );
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2 : c1 === c2;
  }

  optionsChange(ngModel: SFValue | SFValue[], orgData: SFSchemaEnum | SFSchemaEnum[]) {
    console.log(orgData);
    console.log(ngModel);
  }
}
