import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SHARED_IMPORTS } from '@shared';
import { NzSelectSizeType } from 'ng-zorro-antd/select';

import { RoleApiService } from '../apis/role.api.service';
import { Role } from '../model';

export const EXE_ROLE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => BindRoleComponent),
  multi: true
};

@Component({
  selector: 'bind-role',
  standalone: true,
  imports: [SHARED_IMPORTS],
  providers: [EXE_ROLE_VALUE_ACCESSOR],
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
export class BindRoleComponent implements OnInit, ControlValueAccessor {
  listOfOption: Role[] = [];
  size: NzSelectSizeType = 'default';

  @Input()
  selected: Role[] = [];

  @Output()
  readonly selectedChange = new EventEmitter();

  propagateOnChange: (value: any) => void = (_: any) => {};
  propagateOnTouched: (value: any) => void = (_: any) => {};

  constructor(private roleApiService: RoleApiService) {}

  ngOnInit(): void {
    this.roleApiService.list().subscribe(res => {
      this.listOfOption = res.data;
    });
  }

  change(event: any) {
    this.selectedChange.emit(event);
    this.propagateOnChange(event);
  }

  compareFn(o1: any, o2: any): boolean {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  registerOnChange(fn: any): void {
    this.propagateOnChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateOnTouched = fn;
  }

  writeValue(obj: any): void {
    if (obj) {
      this.selected = obj;
    }
  }
}
