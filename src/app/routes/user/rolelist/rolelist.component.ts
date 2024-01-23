import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { SHARED_IMPORTS } from '@shared';

import { RolelistEditComponent } from './edit/edit.component';
import { RolelistViewComponent } from './view/view.component';

@Component({
  selector: 'app-user-rolelist',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './rolelist.component.html'
})
export class RolelistComponent implements OnInit {
  url = `/api/role/page`;
  searchSchema: SFSchema = {
    properties: {
      name: {
        type: 'string',
        title: '角色名'
      }
    }
  };
  @ViewChild('st') private readonly st!: STComponent;
  columns: STColumn[] = [
    { title: '编号', index: 'id' },
    { title: '名称', type: 'tag', index: 'name' },
    {
      title: '',
      buttons: [
        {
          text: '查看',
          type: 'static',
          modal: { component: RolelistViewComponent },
          click: (item: any) => `/form/${item.id}`
        },
        { text: '编辑', type: 'modal', modal: { component: RolelistEditComponent }, click: 'reload' }
      ]
    }
  ];

  constructor(
    private http: _HttpClient,
    private modal: ModalHelper
  ) {}

  ngOnInit(): void {
    console.log('ngOnInit');
  }

  add(): void {
    this.modal.createStatic(RolelistEditComponent, null).subscribe(() => this.st.reload());
  }
}
