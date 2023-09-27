import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../views/account/account.service';

@Injectable()
export class AuthGuard {
  constructor(private auth: AccountService, public router: Router) {}

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
