import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SHARED_IMPORTS } from '@shared';
import { NzSelectSizeType } from 'ng-zorro-antd/select';

import { RoleApiService } from '../apis/role.api.service';
import { Role } from '../model';

@Component({
  selector: 'bind-role',
  standalone: true,
  imports: [SHARED_IMPORTS],
  template: `
    <nz-select
      [(ngModel)]="selected"
      [nzSize]="size"
      nzMode="tags"
      nzPlaceHolder="Please select"
      (ngModelChange)="change($event)"
      [compareWith]="compareFn"
    >
      <nz-option *ngFor="let option of listOfOption" [nzLabel]="option.name" [nzValue]="option" />
    </nz-select>
  `
})
export class BindRoleComponent implements OnInit {
  listOfOption: Role[] = [];
  size: NzSelectSizeType = 'default';

  @Input()
  selected: Role[] = [];

  @Output()
  readonly selectedChange = new EventEmitter();

  constructor(private roleApiService: RoleApiService) {}

  ngOnInit(): void {
    this.roleApiService.list().subscribe(res => {
      this.listOfOption = res.data;
    });
  }

  change(event: any) {
    this.selectedChange.emit(event);
  }

  compareFn(o1: any, o2: any): boolean {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }
}
