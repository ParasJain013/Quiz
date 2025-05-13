import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { QuizService, LeaderboardEntry } from '../../services/quiz.service';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
  imports: [CommonModule, RouterLink],
  standalone: true,
})
export class LeaderboardComponent implements OnInit {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  sortedEntries: LeaderboardEntry[] = [];
  isLoading = false;
  currentPage = 2;              // next page to load
  totalPages = 1;
  limit = 10;
  activeTab: string = 'leaderboard';
  prevAttempts: any = [];

  constructor(
    private quizService: QuizService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // pull the preloaded page from the resolver:
    const pageData = this.route.snapshot.data['leaderboardPage'] as {
      data: LeaderboardEntry[];
      totalPages: number;
    };
    this.sortedEntries = pageData.data;
    this.totalPages = pageData.totalPages;
  }

  loadMore(): void {
    if (this.isLoading || this.currentPage > this.totalPages) return;
    this.isLoading = true;

    this.quizService.getLeaderboard(this.currentPage, this.limit)
      .subscribe({
        next: (res) => {
          this.sortedEntries.push(...res.data);
          this.currentPage++;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading leaderboard:', err);
          this.router.navigate(['/login']);
          this.isLoading = false;
        },
      });
  }

  onScroll(event: Event) {
    const el = (event.target as HTMLElement);
    if (el.scrollHeight - el.scrollTop <= el.clientHeight + 50) {
      this.loadMore();
    }
  }

  switchTab(tab: string): void {
    this.activeTab = tab;
    if (tab === 'scores') {
      this.quizService.getPreviousAttempt()?.subscribe({
        next: (res: any) => (this.prevAttempts = res.prevAttempts),
        error: (err) => console.error(err),
      });
    }
  }
}
