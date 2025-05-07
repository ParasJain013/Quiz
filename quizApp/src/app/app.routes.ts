import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { RegisterComponent } from './components/auth/register/register.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {path:'quiz', component:QuizComponent},
  {path:'leaderboard', component:LeaderboardComponent},
  {path:'register', component:RegisterComponent}
];
