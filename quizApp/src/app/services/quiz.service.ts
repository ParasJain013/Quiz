import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';
import { shareReplay, tap, BehaviorSubject } from 'rxjs';

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
  private leaderboardCache = new Map<number, LeaderboardEntry[]>(); // page-based cache
  private previousAttemptsCache: any[] | null = null;
  private isSubjectListFetched = false;
  questions: Question[] = [];

  constructor(private http: HttpClient) {}

  // In QuizService

  subjectList$ = new BehaviorSubject<SubjectType[]>([]);
  // public readonly subjectListObservable$ = this.subjectList$.asObservable();

  fetchAllSubjects(): void {
    if (this.isSubjectListFetched) return;
    this.http
      .get<{ subjects: any }>(`${this.apiUrl}quiz/fetch-subjects`, {
        withCredentials: true,
      })
      .subscribe({
        next: (res) => {
          this.subjectList$.next(res.subjects);
        },
        error: (err) => {
          console.error('Failed to fetch subjects:', err);
        },
      });
  }

  // When user selects subject
  fetchSubjectQuestions(
    subject: SubjectType | null
  ): Observable<ApiResponse> | null {

    if (!subject) return null;

    // Check in-memory cache first
    if (this.cache.has(subject)) {
      const cachedResponse = this.cache.get(subject)!;
      return of(cachedResponse); // `of()` creates an observable from the cached value
    }

    // If not in cache, fetch from API and cache it
    return this.http
      .get<ApiResponse>(`${this.apiUrl}quiz/getQuestions?subject=${subject}`, {
        withCredentials: true,
      })
      .pipe(
        tap((data) => {
          this.cache.set(subject, data); // cache it inside Map
        }),
        shareReplay(1)
      );
  }

  // Submit quiz answers
  submitQuiz(userAnswers: any, subject: SubjectType): Observable<any> {
    const body = { answers: userAnswers, subject };
    return this.http.post<any>(`${this.apiUrl}quiz/submitQuiz`, body, {
      withCredentials: true,
    });
  }

  // Get leaderboard
  getLeaderboard(
    page: number,
    limit: number
  ): Observable<{ data: LeaderboardEntry[]; totalPages: number }> {
    if (this.leaderboardCache.has(page)) {
      return of({
        data: this.leaderboardCache.get(page)!,
        totalPages: Math.ceil(this.leaderboardCache.size), // best guess
      });
    }

    return this.http
      .get<{ data: LeaderboardEntry[]; totalPages: number }>(
        `${this.apiUrl}leaderboard/getLeaderboard?page=${page}&limit=${limit}`,
        { withCredentials: true }
      )
      .pipe(
        tap((res) => {
          this.leaderboardCache.set(page, res.data);
        }),
        shareReplay(1)
      );
  }

  // Cached previous attempts
  getPreviousAttempt(): Observable<any> {
    if (this.previousAttemptsCache) {
      return of({ prevAttempts: this.previousAttemptsCache });
    }

    return this.http
      .get<any>(`${this.apiUrl}attempt/previous-attempts`, {
        withCredentials: true,
      })
      .pipe(
        tap((res) => {
          this.previousAttemptsCache = res.prevAttempts;
        }),
        shareReplay(1)
      );
  }
}
