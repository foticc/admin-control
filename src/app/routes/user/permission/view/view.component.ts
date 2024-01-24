import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { SHARED_IMPORTS } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

import { PermsApiService } from '../../apis/perms.api.service';

@Component({
  selector: 'app-user-permission-view',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './view.component.html'
})
export class PermissionViewComponent implements OnInit {
  record: any = {};
  i: any = {};

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    private http: _HttpClient,
    private permsApiservice: PermsApiService
  ) {}

  ngOnInit(): void {
    this.permsApiservice.getPerms(this.record.id).subscribe(res => {
      this.i = res.data;
    });
  }

  close(): void {
    this.modal.destroy();
  }
}
