// login.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthBaseComponent } from '../auth-base-component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent
  extends AuthBaseComponent
  implements OnInit, OnDestroy
{
  constructor(public userService: UserService, public router: Router) {
    super();
  }

  ngOnInit(): void {
    this.userService.checkLoginStatus().subscribe((state) => {
      console.log('login: ', state);
      if (state.loggedIn) {
        this.router.navigate(['/quiz']);
      }
    });
  }
  onPasswordChange(value: string) {
    this.password = value;
    console.log(value);
  }
  signIn() {
    this.userService.signIn(this.email, this.password).subscribe({
      next: (res) => {
        if (res.message === 'successfull') {
          this.router.navigate(['/quiz']);
          this.userService.updateLogoutDisplayState(true);
        }
      },
      error: (err) => {
        if (err.error.message === 'Invalid_Credentials') {
          this.invalidCredentials = true;
        }
      },
    });
  }
  ngOnDestroy(): void {}
}
