import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { SHARED_IMPORTS } from '@shared';

@Component({
  selector: 'app-user-permission-view',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './view.component.html',
})
export class PermissionViewComponent implements OnInit {
  record: any = {};
  i: any;

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    private http: _HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get(`/user/${this.record.id}`).subscribe(res => this.i = res);
  }

  close(): void {
    this.modal.destroy();
  }
}
