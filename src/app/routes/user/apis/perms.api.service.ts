import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';

import { CommonResult, Permission } from '../model';

@Injectable({
  providedIn: 'root'
})
export class PermsApiService {
  constructor(private _http: _HttpClient) {}

  get loading(): boolean {
    return this._http.loading;
  }

  listPage = '/api/perms/page';

  list(): Observable<CommonResult<Permission[]>> {
    return this._http.get('/api/perms/list');
  }

  savePerms(req: Permission): Observable<CommonResult<Permission>> {
    return this._http.post('/api/perms/save', req);
  }

  updatePerms(req: Permission): Observable<CommonResult<Permission>> {
    return this._http.put('/api/perms/update', req);
  }

  deletePerms(id: number): Observable<CommonResult<number>> {
    return this._http.delete(`/api/perms/${id}`);
  }
}
