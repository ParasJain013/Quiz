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
      next: (res:any) => {
        console.log('Fetched leaderboard:', res);

        // Sorting based on highest score
        this.sortedEntries = res.sort((a:any, b:any) => {
          if (b.highestScore !== a.highestScore) {
            return b.highestScore - a.highestScore;
          }
          return new Date(b.latestScoreDate).getTime() - new Date(a.latestScoreDate).getTime();
        });
        console.log(this.sortedEntries)
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading leaderboard:', err);
        this.isLoading = false;
      }
    });
  }
}
