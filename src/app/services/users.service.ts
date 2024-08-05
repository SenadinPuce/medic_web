import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { User } from '../models/user';
import { PagedResult } from '../models/pagedResult';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getUsers(searchString: string, pageIndex: number, pageSize: number) {
    let params = new HttpParams();

    if (searchString !== '') {
      params = params.append('username', searchString);
    }
    params = params.append('pageIndex', pageIndex.toString());
    params = params.append('pageSize', pageSize.toString());

    return this.http.get<PagedResult<User>>(this.baseUrl + 'users', { params });
  }

}
