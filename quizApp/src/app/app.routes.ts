import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { QuizResolver } from './resolvers/quiz.resolver';
import { authGuard } from './services/auth.guard';
import { LeaderboardResolver } from './resolvers/leaderboard.resolver';

export const routes: Routes = [
  { path: 'login', canActivate:[authGuard],component: LoginComponent },
  {path:'quiz', canActivate:[authGuard],component:QuizComponent, resolve:{subjectList: QuizResolver}},
  {path:'leaderboard', canActivate:[authGuard],component:LeaderboardComponent, resolve:{leaderboardPage: LeaderboardResolver}},
  {path:'register', canActivate:[authGuard],component:RegisterComponent}
];
