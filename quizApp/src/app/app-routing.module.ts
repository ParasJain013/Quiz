import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { QuizComponent } from './components/quiz/quiz.component';
const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },
  {path:'quiz', component:QuizComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
