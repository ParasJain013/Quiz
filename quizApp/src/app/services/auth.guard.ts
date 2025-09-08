import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from './user.service';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state): Observable<boolean> => {
  const userService = inject(UserService);
  const router = inject(Router);
  const isLoginRoute = state.url === '/login' || state.url === '/register';

  // If login status is already fetched
  if (userService.loginStatusFetched) {
    if (userService.cachedLoginStatus) {
      // User is logged in
      if (isLoginRoute) {
        router.navigate(['/quiz']);
        return of(false);
      }
      return of(true);
    } else {
      // User is not logged in
      if (isLoginRoute) {
        return of(true);
      }
      router.navigate(['/login']);
      return of(false);
    }
  }

  // If login status has NOT been fetched, check it from server
  return userService.checkLoginStatus().pipe(
    switchMap((res) => {
      const loggedIn = res.loggedIn;
      userService.updateLogoutDisplayState(res.loggedIn);
      if (loggedIn) {
        if (isLoginRoute) {
          router.navigate(['/quiz']);
          return of(false);
        }
        return of(true);
      } else {
        if (isLoginRoute) {
          return of(true);
        }
        router.navigate(['/login']);
        return of(false);
      }
    })
  );
};

