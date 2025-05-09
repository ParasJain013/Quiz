import { Injectable } from '@angular/core';
import { BehaviorSubject, of , map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl;
  loginStatusFetched = false;
  cachedLoginStatus: boolean = false;
  
  loginStatus$ = new BehaviorSubject<boolean | null>(null);
  displayLogout$ = new BehaviorSubject<boolean>(false);
  private logoutTimer: any;

  constructor(private http: HttpClient, private router:Router) {}

  redirectToLoginPage(){
    this.router.navigate(['/login'])
  }
  checkLoginStatus() {
    if (this.loginStatusFetched) {
      // Already fetched: return cached value
      return of({ loggedIn: this.cachedLoginStatus });
    }

    return this.http.get<{ loggedIn: boolean }>(
      `${this.apiUrl}user/check-session`,
      { withCredentials: true }
    ).pipe(
      map((res) => {
        this.cachedLoginStatus = res.loggedIn;
        this.loginStatusFetched = true;
        return res;
      })
    );
  }

  resetLoginStatusCache() {
    this.loginStatusFetched = false;
    this.cachedLoginStatus = false;
  }

  signIn(email: string, password: string) {
    return this.http.post<any>(
      `${this.apiUrl}user/login`,
      { email, password },
      { withCredentials: true }
    );
  }

  signUp(name: string, email: string, password: string) {
    return this.http.post<any>(
      `${this.apiUrl}user/signup`,
      { username: name, password, email },
      { withCredentials: true }
    );
  }

  afterSuccessfullLogin(){
    this.updateLogoutDisplayState(true);
    this.startLogoutTimeout();
    this.cachedLoginStatus = true;
    this.loginStatusFetched = true;

    this.router.navigate(['/quiz']);
  }
  updateLogoutDisplayState(state: boolean) {
    this.displayLogout$.next(state);
  }

  isLoggedin() {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='))?.split('=')[1];
    return !!token;
  }
  startLogoutTimeout() {
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
    }

    this.logoutTimer = setTimeout(() => {
      this.logout();
      this.updateLogoutDisplayState(false);
    }, 2*60*60*1000); // 2 hours
  }
  logout() {
    document.cookie = 'token=; Max-Age=0; path=/;';
    this.resetLoginStatusCache(); // Clear cache on logout
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
    }
    this.router.navigate(['/login'])
  }
}
