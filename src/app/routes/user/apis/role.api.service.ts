import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';

import { CommonResult, Role } from '../model';

@Injectable({
  providedIn: 'root'
})
export class RoleApiService {
  constructor(private _http: _HttpClient) {}

  get loading(): boolean {
    return this._http.loading;
  }

  list(): Observable<CommonResult<Role[]>> {
    return this._http.get('/api/role/list');
  }

  saveRole(req: Role): Observable<CommonResult<Role>> {
    return this._http.post('/api/role/save', req);
  }

  updateUser(req: Role): Observable<CommonResult<Role>> {
    return this._http.put('/api/user/update', req);
  }

  deleteRole(id: number): Observable<CommonResult<number>> {
    return this._http.delete(`/api/role/${id}`);
  }
}
