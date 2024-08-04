import { Injectable, inject } from '@angular/core';
import { AccountService } from './account.service';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InitService {
  private accountService = inject(AccountService);

  init() {
    return this.accountService.getUserInfo().pipe(
      tap(user => {
        if (user) {
          console.log('User info loaded:', user);
        }
      })
    );
  }
}
