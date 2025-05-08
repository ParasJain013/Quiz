import { Injectable } from '@angular/core';
import { BehaviorSubject, of , map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl;
  loginStatusFetched = false;
  cachedLoginStatus: boolean = false;

  loginStatus$ = new BehaviorSubject<boolean | null>(null);
  displayLogout$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

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

  updateLogoutDisplayState(state: boolean) {
    this.displayLogout$.next(state);
  }

  isLoggedin() {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='))?.split('=')[1];
    return !!token;
  }

  logout() {
    document.cookie = 'token=; Max-Age=0; path=/;';
    this.resetLoginStatusCache(); // Clear cache on logout
  }
}
