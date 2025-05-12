import { Subscription } from 'rxjs';

export abstract class AuthBaseComponent {
  name = '';
  email = '';
  password = '';
  hover = false;
  validEmail: Boolean = true;
  showPassword: boolean = false;
  invalidCredentials: boolean = false;
  nameSubscription: Subscription | null = null;

  onEmailChange(value: string) {
    this.email = value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.validEmail = emailPattern.test(this.email);
  }
}
