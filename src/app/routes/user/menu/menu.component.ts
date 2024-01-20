import { Component, OnInit } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { SHARED_IMPORTS } from '@shared';
import { Observable } from 'rxjs';

import { MenueditComponent } from './menuedit/menuedit.component';

export interface TreeNodeInterface {
  id: number;
  group: boolean;
  text: string;
  link: string;
  icon?: string;
  level: number;
  parentId?: number;
  children?: TreeNodeInterface[];
  expand?: boolean;
  parent?: TreeNodeInterface;
}

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './menu.component.html'
})
export class UserMenuComponent implements OnInit {
  loading: boolean = false;
  tableData: TreeNodeInterface[] = [];
  mapOfExpandedData: { [key: string]: TreeNodeInterface[] } = {};

  constructor(
    private _http: _HttpClient,
    private modal: ModalHelper
  ) {}

  ngOnInit(): void {
    this._http.get('/api/menu/load').subscribe(res => {
      this.tableData = res.data;
      this.tableData.forEach(fe => {
        this.mapOfExpandedData[fe.id] = this.convertTreeToList(fe);
      });
    });
  }

  collapse(array: TreeNodeInterface[], data: TreeNodeInterface, $event: boolean): void {
    console.log($event);
    if ($event) {
      console.log('data');
      if (data.children && data.children.length > 0) {
        data.children.forEach(d => {
          // tslint:disable-next-line:no-non-null-assertion
          const target = array.find(a => a.id === d.id)!;
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        this.loading = true;
        this.getChildren(data.id).subscribe(res => {
          let childData: TreeNodeInterface = res.data;
          // @ts-ignore
          data.children = childData;
          // @ts-ignore
          Array.from(childData).forEach(child => {
            // @ts-ignore

            const childObj = {
              // @ts-ignore
              ...child,
              level: data.level + 1,
              expand: false,
              parent: data,
              children: []
            };
            // 插入到具体的节点中
            // @ts-ignore
            if (!array.map(opt => opt.id).includes(child.id)) {
              const childParentIndex = array.map(opt => opt.id).indexOf(data.id);
              array.splice(childParentIndex + 1, 0, childObj);
            }
          });
          this.loading = false;
        });
      }
    }
  }

  convertTreeToList(root: object): TreeNodeInterface[] {
    const stack: any[] = [];
    const array: any[] = [];
    const hashMap = {};
    stack.push({ ...root, level: 0, expand: false });

    while (stack.length !== 0) {
      const node = stack.pop();
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push({ ...node.children[i], level: node.level + 1, expand: false, parent: node });
        }
      }
    }

    return array;
  }

  visitNode(node: TreeNodeInterface, hashMap: { [key: string]: any }, array: TreeNodeInterface[]): void {
    if (!hashMap[node.id]) {
      hashMap[node.id] = true;
      array.push(node);
    }
  }

  getChildren(pid: number): Observable<any> {
    return this._http.get(`/api/menu/load?pid=${pid}`);
  }

  edit(item: TreeNodeInterface): void {
    console.log(item);
    this.modal.createStatic(MenueditComponent, { record: item }).subscribe(s => {
      if (s.action != 'reload') {
      }
    });
  }

  delete(item: TreeNodeInterface): void {
    console.log(`delete${item.id}`);
  }

  confirm() {}

  cancel() {}

  beforeConfirm(): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, 3000);
    });
  }
}
