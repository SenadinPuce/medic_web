import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthenticatedUser } from '../models/authenticatedUser';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);
  currentUser = signal<AuthenticatedUser | null>(null);
  isAdmin = computed(() => {
    const roles = this.currentUser()?.roles;
    return Array.isArray(roles) ? roles.includes('admin') : roles === 'admin';
  });

  login(values: any) {
    return this.http.post(this.baseUrl + 'account/login', values, { withCredentials: true });
  }

  
  getUserInfo() {
    return this.http.get<AuthenticatedUser>(this.baseUrl + 'account/user-info').pipe(
      map(user => {
        this.currentUser.set(user);
        return user;
      })
    )
  }
}
