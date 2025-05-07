import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { QuizService, LeaderboardEntry } from '../../services/quiz.service';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
  imports: [CommonModule, RouterLink],
  standalone: true,
})
export class LeaderboardComponent implements OnInit {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  sortedEntries: LeaderboardEntry[] = [];
  isLoading = false;
  currentPage = 1;
  totalPages = 1;
  limit = 10;
  activeTab: string = 'leaderboard';
  prevAttempts: any = [];

  ngOnInit(): void {
    this.loadMore();
  }
  switchTab(tab: string): void {
    this.activeTab = tab;
    this.quizService.getPreviousAttempt()?.subscribe({
      next: (res: any) => {
        this.prevAttempts = res.prevAttempts;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  constructor(private quizService: QuizService, private router: Router) {}

  loadMore(): void {
    if (this.isLoading || this.currentPage > this.totalPages) return;

    const container = this.scrollContainer?.nativeElement as HTMLElement;
    this.isLoading = true;

    this.quizService.getLeaderboard(this.currentPage, this.limit)?.subscribe({
      next: (res: any) => {
        this.totalPages = res.totalPages;
        if (!res || res.data.length === 0) return;

        this.sortedEntries.push(...res.data);

        this.currentPage++;
        this.isLoading = false;
      },
      error: (err) => {
        this.router.navigate(['/login']);
        console.error('Error loading leaderboard:', err);
        this.isLoading = false;
      },
    });
  }

  onScroll(event: Event) {
    const element = event.target as HTMLElement;
    if (element.scrollHeight - element.scrollTop <= element.clientHeight + 50) {
      this.loadMore();
    }
  }
}
