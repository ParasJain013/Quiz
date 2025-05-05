import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';
import { shareReplay, tap } from 'rxjs';
// Types
export type SubjectType = 'History' | 'Geography' | 'GK';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  q: string;
  id: string;
  options: { id: string; option: string }[];
  correctId: string;
  difficulty: Difficulty;
}

export interface LeaderboardEntry {
  name: string;
  highestScore: number;
  latestScore: number;
  subject: SubjectType;
  timestamp: number;
  latestScoreDate: string;
}

export interface ApiResponse {
  subject: SubjectType;
  questions: Question[];
  metadata: { easyCount: number; mediumCount: number; hardCount: number };
}

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private apiUrl = environment.apiUrl;
  private cache = new Map<SubjectType, ApiResponse>(); //  Using Map for caching

  subjectList: SubjectType[] = ['History', 'Geography', 'GK'];
  questions: Question[] = [];

  constructor(private http: HttpClient) {}

  // When user selects subject
  fetchSubjectQuestions(subject: SubjectType | null): Observable<ApiResponse> | null {
    console.log("Cached: ",this.cache)
    if (!subject) return null;

    // Check in-memory cache first
    if (this.cache.has(subject)) {
      const cachedResponse = this.cache.get(subject)!;
      return of(cachedResponse); // `of()` creates an observable from the cached value
    }

    // If not in cache, fetch from API and cache it
    return this.http.get<ApiResponse>(`${this.apiUrl}quiz/getQuestions?subject=${subject}`)
      .pipe(
        tap((data) => {
          this.cache.set(subject, data); // cache it inside Map
        }),
        shareReplay(1)
      );
  }

  // Submit quiz answers
  submitQuiz(userAnswers: any, subject: SubjectType): Observable<any> {
    const name = localStorage.getItem('name');
    if (!name) {
      console.error('No user name found');
    }
    const body = { answers: userAnswers, subject, user: name };
    return this.http.post<any>(`${this.apiUrl}quiz/submitQuiz`, body);
  }

  // Get leaderboard
  getLeaderboard(): Observable<LeaderboardEntry[]> {
    return this.http.get<LeaderboardEntry[]>(`${this.apiUrl}leaderboard/getLeaderboard`);
  }
}

