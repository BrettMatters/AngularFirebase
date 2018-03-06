import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { UserService } from '../providers/user.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.userService.getLoggedInUser().subscribe((user) => {
        if (user) {
          resolve(true);
        } else {
          this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
          resolve(false);
        }
      });
    });
  }
}
