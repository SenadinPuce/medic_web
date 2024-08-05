import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticatedUser } from '../models/authenticatedUser';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';

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

  logout() {
    return this.http.post(this.baseUrl + 'account/logout', {});
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
