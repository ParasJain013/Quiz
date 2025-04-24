import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  name = '';
  nameSubscription: Subscription | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    const currentName = this.userService.getName();
    if (currentName) {
      this.router.navigate(['/quiz']);
    }

    this.nameSubscription = this.userService.name$.subscribe((name) => {
      if (name && this.router.url === '/login') {
        this.router.navigate(['/quiz']);
      }
    });
  }

  onNameChange(value: string) {
    this.name = value;
  }

  get isNameInvalid(): boolean {
    return !this.name.trim();
  }

  onNextClick() {
    const trimmedName = this.name.trim();
    if (trimmedName) {
      this.userService.setName(trimmedName);
    }
  }

  ngOnDestroy(): void {
    this.nameSubscription?.unsubscribe();
  }
}

