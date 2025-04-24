import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {path:'quiz', component:QuizComponent},
  {path:'leaderboard', component:LeaderboardComponent}
];
