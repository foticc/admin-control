import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { SHARED_IMPORTS } from '@shared';

import { PermissionEditComponent } from './edit/edit.component';
import { PermissionViewComponent } from './view/view.component';

@Component({
  selector: 'app-user-permission',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './permission.component.html'
})
export class PermissionComponent implements OnInit {
  url = `/perms/page`;
  searchSchema: SFSchema = {
    properties: {
      id: {
        type: 'string',
        title: '编号'
      }
    }
  };
  @ViewChild('st') private readonly st!: STComponent;
  columns: STColumn[] = [
    { title: '编号', index: 'id' },
    { title: '路径', type: 'link', index: 'path' },
    {
      title: '',
      buttons: [
        {
          text: '查看',
          type: 'static',
          modal: {
            component: PermissionViewComponent
          }
        },
        {
          text: '编辑',
          type: 'static',
          modal: {
            component: PermissionEditComponent
          },
          click: 'reload'
        }
      ]
    }
  ];

  constructor(
    private http: _HttpClient,
    private modal: ModalHelper
  ) {}

  ngOnInit(): void {}

  add(): void {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }
}
