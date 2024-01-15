import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';

import { Pageable } from '../model';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  constructor(private http: _HttpClient) {}

  listPage(page: Pageable) {
    this.http.request('get', 'user/page').subscribe(s => {
      console.log(s);
    });
  }
}
