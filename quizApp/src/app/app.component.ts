// app.component.ts
import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [NavbarComponent, RouterOutlet, RouterModule, CommonModule, HttpClientModule],
  standalone: true
})
export class AppComponent {
  title = 'quizApp';
  showQuizButton = true;
  showLanding = true;
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (this.router.url === '/') {
        this.showLanding = true;
      } else {
        this.showLanding = false;
      }
    });
  }

  takeQuizBtn(){
    this.router.navigate(['/quiz'])
  }

}