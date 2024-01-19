import { Component, OnDestroy, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { SHARED_IMPORTS } from '@shared';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-menuedit',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './menuedit.component.html',
  styles: ``
})
export class MenueditComponent implements OnInit, OnDestroy {
  record = {
    expand: false,
    group: true,
    hasChildren: null,
    icon: 'user',
    id: 1,
    level: 0,
    link: '/1',
    parentId: null,
    text: '菜单12'
  };

  constructor(
    private modal: NzModalRef,
    private _http: _HttpClient
  ) {}

  close() {
    this.modal.close({ action: '12' });
  }

  ngOnInit(): void {
    // this._http.get('/api/menu/1').subscribe(res => {
    //   this.record = res.data;
    // });
    console.log(this.record);
  }

  ngOnDestroy(): void {
    this.modal.destroy();
  }
}
