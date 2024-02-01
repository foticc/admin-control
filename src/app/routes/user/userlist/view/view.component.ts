import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { SHARED_IMPORTS } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-user-userlist-view',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './view.component.html'
})
export class UserlistViewComponent implements OnInit {
  record: any;
  i: any;

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    private http: _HttpClient
  ) {}

  ngOnInit(): void {
    this.http.get(`/user/list/${this.record.id}`).subscribe(res => (this.i = res.id));
  }

  close(): void {
    this.modal.destroy();
  }
}
