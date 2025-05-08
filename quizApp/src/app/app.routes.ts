import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginStatusResolver } from './resolvers/login-status.service';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, resolve:{isLoggedIn: LoginStatusResolver} },
  {path:'quiz', component:QuizComponent, resolve:{isLoggedIn: LoginStatusResolver}},
  {path:'leaderboard', component:LeaderboardComponent, resolve:{isLoggedIn: LoginStatusResolver}},
  {path:'register', component:RegisterComponent, resolve:{isLoggedIn: LoginStatusResolver}}
];
