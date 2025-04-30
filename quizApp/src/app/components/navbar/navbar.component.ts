import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { Router, RouterLink } from '@angular/router'; // Import Router
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [CommonModule, RouterLink],
  standalone: true,
})
export class NavbarComponent implements OnInit {
  displayLogout = false;
  nameSubscription!: Subscription;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.nameSubscription = this.userService.name$.subscribe(name => {
      this.displayLogout = !!name;

      if (!name) {
        this.router.navigate(['/login']); 
      }
    });
  }

  handleLogout() {
    console.log("Logout Button Clicked");
    this.userService.logout();
  }

}
