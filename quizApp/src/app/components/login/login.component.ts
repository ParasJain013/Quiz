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
  name: string = '';
  nameSubscription!: Subscription;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    const currentName = this.userService.getName();
    console.log(currentName)
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
    this.name = value.trim(); 
  }
  nameInputValid(){
    if (!this.name || this.name.trim().length === 0) {
      // alert('Please enter a valid name');
      return true;
    }
    return false;
  }
  onNextClick() {
    if (this.name.trim()) {
      this.userService.setName(this.name.trim());
    }
  }

  ngOnDestroy(): void {
    this.nameSubscription.unsubscribe();
  }
}
