import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private nameSource = new BehaviorSubject<string>(localStorage.getItem('name') || '');
  name$ = this.nameSource.asObservable();

  setName(name: string) {
    localStorage.setItem('name', name);
    this.nameSource.next(name);
  }

  getName(): string {
    return this.nameSource.getValue();
  }

  logout() {
    localStorage.removeItem('name');
    this.nameSource.next('');
  }
}

