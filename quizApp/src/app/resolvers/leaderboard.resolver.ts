// src/app/resolvers/leaderboard.resolver.ts
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { QuizService, LeaderboardEntry } from '../services/quiz.service';

export interface LeaderboardPage {
  data: LeaderboardEntry[];
  totalPages: number;
}

@Injectable({ providedIn: 'root' })
export class LeaderboardResolver 
  implements Resolve<Observable<LeaderboardPage>> {

  private readonly initialPage = 1;
  private readonly initialLimit = 10;

  constructor(private quizService: QuizService) {}
  
  resolve(): Observable<LeaderboardPage> {
    return this.quizService
      .getLeaderboard(this.initialPage, this.initialLimit)
  }
}
