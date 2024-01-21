import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';

import { CommonResult, Pageable, UserDetail } from '../model';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  constructor(private _http: _HttpClient) {}

  listPage(page: Pageable) {
    this._http.get('/api/list/page', page).subscribe(s => {
      console.log(s);
    });
  }

  getUser(id: number): Observable<CommonResult<UserDetail>> {
    return this._http.get(`/api/user/${id}`);
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
