import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { Router, RouterLink } from '@angular/router'; // Import Router
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [CommonModule, RouterLink],
  standalone: true,
})
export class NavbarComponent implements OnInit {
  // nameSubscription!: Subscription;
  displayLogout = false;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.displayLogout$.subscribe((val) => {
      this.displayLogout = val;
    });

    this.userService.checkLoginStatus().subscribe((state) => {
      if (!state.loggedIn) {
        this.router.navigate(['/login']);
      } else {
        this.userService.updateLogoutDisplayState(true);
      }
    });
  }

  handleLogout() {
    this.userService.logout();
    this.router.navigate(['/login']);
    this.userService.updateLogoutDisplayState(false);
  }
}
