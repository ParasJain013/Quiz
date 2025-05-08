import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, RouterLink, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthBaseComponent } from '../auth-base-component';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  styleUrls: ['./register.component.scss'],
  imports: [CommonModule, FormsModule, RouterModule, RouterLink],
})
export class RegisterComponent extends AuthBaseComponent implements OnInit {
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {
    super();
  }
  passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  validPassword: boolean = true;
  alreadyExist: boolean = false;
  ngOnInit(): void {
    const loggedIn = this.route.snapshot.data['isLoggedIn'];
    if (loggedIn) {
      this.router.navigate(['/quiz']);
    }
  }
  onPasswordChange(value: string) {
    this.password = value;
    this.validPassword = this.passwordRegex.test(value);
  }
  onNameChange(value: string) {
    this.name = value.trim();
  }
  signUp() {
    this.userService.signUp(this.name, this.email, this.password).subscribe({
      next: (res) => {
        if (res.message == 'User registered successfully') {
          this.router.navigate(['/quiz']);
        }
      },
      error: (err) => {
        if (err.error.message == 'User_Already_Exist') {
          this.alreadyExist = true;
        }
      },
    });
  }
}
