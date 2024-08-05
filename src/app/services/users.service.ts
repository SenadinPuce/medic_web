import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../models/user';
import { PagedResult } from '../models/pagedResult';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getUserById(id: string) {
    return this.http.get<User>(this.baseUrl + 'users/details/' + id);
  }

  getUsers(searchString: string, pageIndex: number, pageSize: number) {
    let params = new HttpParams();

    if (searchString !== '') {
      params = params.append('username', searchString);
    }
    params = params.append('pageIndex', pageIndex.toString());
    params = params.append('pageSize', pageSize.toString());

    return this.http.get<PagedResult<User>>(this.baseUrl + 'users', { params });
  }

  addUser(user: User) {
    return this.http.post<User>(this.baseUrl + 'users/add', user);
  }

  updateUser(id: string, user: User) {
    return this.http.put<User>(this.baseUrl + 'users/update/' + id, user);
  }

  blockUser(id: string, status: boolean) {
    return this.http.patch<User>(this.baseUrl + 'users/change-status/' + id, {isBlocked: status});
  }
}
