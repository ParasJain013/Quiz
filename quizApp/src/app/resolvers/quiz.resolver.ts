import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { QuizService } from '../services/quiz.service';

@Injectable({ providedIn: 'root' })
export class QuizResolver implements Resolve<Observable<string[]>> {
  constructor(private quizService: QuizService) {}

  resolve(): Observable<string[]> {
    return this.quizService.fetchAllSubjects()
  }
}
