import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';

@Injectable({ providedIn: 'root' })
export class LoginStatusResolver implements Resolve<boolean> {
  constructor(private userService: UserService, private router: Router) {}

  resolve(): Observable<boolean> {
    return this.userService.checkLoginStatus().pipe(
      map((res) => {
        this.userService.updateLogoutDisplayState(res.loggedIn);
        return res.loggedIn;
      }),
      catchError(() => {
        this.userService.updateLogoutDisplayState(false);
        return of(false);
      })
    );
  }
}
