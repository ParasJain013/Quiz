import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
export type SubjectType = 'History' | 'Geography' | 'GK';
export type Difficulty = 'easy' | 'medium' | 'hard';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

// quiz.service.ts
export interface Question {
  q: string;
  id:string;
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
  latestScoreDate: string
}
export interface ApiQuestion {
  q: string;
  options: { id: string; option: string }[];
  correctId: string;
  difficulty: Difficulty;
}
export interface ApiResponse {
  subject: SubjectType;
  questions: Question[];
  metadata: {easyCount:number,mediumCount:number,hardCount:number};
}

export type DifficultyLevel = {
  easy: Question[];
  medium: Question[];
  hard: Question[];
};

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private http: HttpClient) {}
  private subjectSource = new BehaviorSubject<SubjectType | null>(null);
  subjectList: SubjectType[] = ['History', 'Geography', 'GK'];
  private apiUrl = environment.apiUrl;
  subject$ = this.subjectSource.asObservable();

  submitQuiz(userAnswers: any, subject: SubjectType): Observable<any> {
    const name = localStorage.getItem('name');
    if (!name) {
      console.error('No user name found');
    }
    const body = {answers:userAnswers , subject, user:name}

    return this.http.post<any>(`${this.apiUrl}quiz/submitQuiz`, body);
  }
  questions: Question[] = [];

  setSubject(subject: SubjectType | null): Observable<ApiResponse> | null {
    this.subjectSource.next(subject);
    if (!subject) return null;

    return this.http.get<ApiResponse>(`${this.apiUrl}quiz/getQuestions?subject=${subject}`);
  }
  getSubject(): SubjectType | null {
    return this.subjectSource.getValue();
  }
  getLeaderboard(): Observable<LeaderboardEntry[]> {
      return this.http.get<LeaderboardEntry[]>(`${this.apiUrl}leaderboard/getLeaderboard`)
  }
}
