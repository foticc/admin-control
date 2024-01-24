import { Component, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '@shared';
import { TransferItem } from 'ng-zorro-antd/transfer';
import { mergeMap, of } from 'rxjs';

import { RoleApiService } from '../apis/role.api.service';

@Component({
  selector: 'user-bind-role',
  standalone: true,
  imports: [SHARED_IMPORTS],
  templateUrl: './bind-role.component.html'
})
export class BindRoleComponent implements OnInit {
  list: TransferItem[] = [];
  disabled = false;

  nselectKey = ['0', '2'];

  constructor(private apiService: RoleApiService) {}

  ngOnInit(): void {
    this.apiService
      .list()
      .pipe(
        mergeMap(m => {
          return of(
            m.data.map(mp => {
              return {
                key: mp.id,
                title: mp.name
              } as TransferItem;
            })
          );
        })
      )
      .subscribe(se => {
        this.list = se;
      });
  }

  select(ret: {}): void {
    console.log('nzSelectChange', ret);
  }

  change(ret: {}): void {
    console.log('nzChange', ret);
  }
}
