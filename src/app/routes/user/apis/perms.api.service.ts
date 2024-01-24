import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';

import { CommonResult, Permission, PermissionVo } from '../model';

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

  getPerms(id: number): Observable<CommonResult<PermissionVo>> {
    return this._http.get(`/api/perms/${id}`);
  }

  savePerms(req: PermissionVo): Observable<CommonResult<PermissionVo>> {
    return this._http.post('/api/perms/save', req);
  }

  updatePerms(req: PermissionVo): Observable<CommonResult<PermissionVo>> {
    return this._http.put('/api/perms/update', req);
  }

  deletePerms(id: number): Observable<CommonResult<number>> {
    return this._http.delete(`/api/perms/${id}`);
  }
}
