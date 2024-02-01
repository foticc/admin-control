import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { _HttpClient } from '@delon/theme';
import { SHARED_IMPORTS } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzFormatEmitEvent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { map, Observable } from 'rxjs';

import { MenuApiService } from '../../apis/menu.api.service';

@Component({
  selector: 'app-menuedit',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './menuedit.component.html',
  styles: ``
})
export class MenueditComponent implements OnInit, OnDestroy {
  nodes: NzTreeNodeOptions[] = [];
  nodeSelectValue?: string = '菜单1';
  record: any;
  action: string;
  form = this.fb.group({
    group: [false],
    hasChildren: null,
    icon: '',
    id: null,
    level: 0,
    link: null,
    parentId: null,
    text: null,
    enable: true
  });

  constructor(
    private modal: NzModalRef,
    private fb: UntypedFormBuilder,
    private msgSrv: NzMessageService,
    private _http: _HttpClient,
    private menuApiService: MenuApiService
  ) {
    this.action = '';
  }

  close() {
    this.modal.close('close');
  }

  ngOnInit(): void {
    console.log(this.action);
    if (this.action === 'edit') {
      this.menuApiService.getMenu(this.record.id).subscribe(res => {
        if (res.data) {
          this.form.setValue(res.data);
        }
      });
    }
    if (!this.record.group) {
      this._http.get('/api/menu/tree').subscribe(res => {
        this.nodes = res.data;
      });
    }
  }

  ngOnDestroy(): void {
    this.modal.destroy();
  }

  submitForm() {
    if (this.action === 'edit') {
      this.menuApiService.updateMenu(this.form.value).subscribe(res => {
        if (res.data) {
          this.msgSrv.success('保存成功！');
          this.modal.close('success');
        } else {
          this.msgSrv.error('保存失败！');
        }
      });
    } else {
      if (this.action === 'add' && this.record.id) {
        this.form.patchValue({ parentId: this.record.id });
      }
      this.menuApiService.saveMenu(this.form.value).subscribe(res => {
        if (res.data.id) {
          this.msgSrv.success('保存成功！');
          this.modal.close('success');
        } else {
          this.msgSrv.error('保存失败！');
        }
      });
    }
  }

  onExpandChange(e: NzFormatEmitEvent): void {
    const node = e.node;
    if (node && node.getChildren().length === 0 && node.isExpanded) {
      this.loadNode(node?.key).subscribe(data => {
        node.addChildren(data);
      });
    }
  }

  loadNode(key?: string): Observable<NzTreeNodeOptions[]> {
    return this._http.get(`/api/menu/tree?pid=${key}`).pipe(map(m => m.data));
  }
}
