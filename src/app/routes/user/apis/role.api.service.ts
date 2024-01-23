import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';

import { CommonResult, Role, UserDetail } from '../model';

@Injectable({
  providedIn: 'root'
})
export class RoleApiService {
  constructor(private _http: _HttpClient) {}

  list(): Observable<CommonResult<Role[]>> {
    return this._http.get('/api/role/list');
  }

  saveUser(req: UserDetail): Observable<CommonResult<UserDetail>> {
    return this._http.post('/api/user/save', req);
  }

  updateUser(req: UserDetail): Observable<CommonResult<UserDetail>> {
    return this._http.put('/api/user/update', req);
  }

  deleteUser(id: number): Observable<CommonResult<number>> {
    return this._http.delete(`/api/user/${id}`);
  }
}
