// login.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthBaseComponent } from '../auth-base-component';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent
  extends AuthBaseComponent
  implements OnInit, OnDestroy
{
  constructor(public userService: UserService, public router: Router, private route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    const loggedIn = this.route.snapshot.data['isLoggedIn'];
    if(loggedIn){
      this.router.navigate(['/quiz']);
    }
  }
  onPasswordChange(value: string) {
    this.password = value;
  }
  signIn() {
    this.userService.signIn(this.email, this.password).subscribe({
      next: (res) => {
        if (res.message === 'successfull') {
          this.userService.updateLogoutDisplayState(true);
          
          this.userService.cachedLoginStatus = true;
          this.userService.loginStatusFetched = true;
  
          this.router.navigate(['/quiz']);
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
