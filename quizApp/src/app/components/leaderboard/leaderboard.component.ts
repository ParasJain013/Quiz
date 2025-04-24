import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { QuizService, LeaderboardEntry } from '../../services/quiz.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class LeaderboardComponent implements OnInit {
  sortedEntries: LeaderboardEntry[] = [];
  isLoading = true;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizService.getLeaderboard()?.subscribe({
      next: (res: LeaderboardEntry[]) => {
        console.log('Fetched leaderboard:', res);

        if (!res || res.length === 0) {
          this.sortedEntries = [];
        } else {
          // Sort by highest score, then latest attempt date
          this.sortedEntries = res.sort((a, b) => {
            if (b.highestScore !== a.highestScore) {
              return b.highestScore - a.highestScore;
            }
            return Date.parse(b.latestScoreDate) - Date.parse(a.latestScoreDate);
          });
        }

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading leaderboard:', err);
        this.isLoading = false;
      }
    });
  }
}
