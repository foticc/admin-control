import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';

import { CommonResult, MenuVo } from '../model';

@Injectable({
  providedIn: 'root'
})
export class MenuApiService {
  constructor(private _http: _HttpClient) {}

  get loading(): boolean {
    return this._http.loading;
  }

  getMenu(id: number): Observable<CommonResult<MenuVo>> {
    return this._http.get(`/api/menu/${id}`);
  }

  updateMenu(req: MenuVo): Observable<CommonResult<MenuVo>> {
    return this._http.put('/api/menu/update', req);
  }

  saveMenu(req: MenuVo): Observable<CommonResult<MenuVo>> {
    return this._http.post('/api/menu/save', req);
  }

  delMenu(id: number): Observable<CommonResult<MenuVo>> {
    return this._http.delete(`/api/menu/${id}`);
  }
}
