import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { _HttpClient } from '@delon/theme';
import { SHARED_IMPORTS } from '@shared';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzFormatEmitEvent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { map, Observable } from 'rxjs';

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
  form = this.fb.group({
    expand: false,
    group: true,
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
    private _http: _HttpClient,
    private fb: FormBuilder
  ) {}

  close() {
    this.modal.close({ action: '12' });
  }

  ngOnInit(): void {
    // this._http.get('/api/menu/1').subscribe(res => {
    //   this.record = res.data;
    // });
    this.form.patchValue(this.record);
    this._http.get('/api/menu/tree').subscribe(res => {
      console.log(res.data);
      this.nodes = res.data;
    });
  }

  ngOnDestroy(): void {
    this.modal.destroy();
  }

  submitForm() {
    console.log(this.form.value);
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
