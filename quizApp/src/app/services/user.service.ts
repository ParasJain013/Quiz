import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  private apiUrl = environment.apiUrl;
  displayLogout$ = new BehaviorSubject<boolean>(false);

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
  checkLoginStatus() {
    return this.http.get<{ loggedIn: boolean }>(
      `${this.apiUrl}user/check-session`,
      { withCredentials: true }
    );
  }
  isLoggedin() {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='))
      ?.split('=')[1];

    console.log(token);
    if (token) return true;

    return false;
  }
  logout() {
    document.cookie = 'token=; Max-Age=0; path=/;';
  }
}
