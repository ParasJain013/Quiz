import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  QuizService,
  SubjectType,
  Question,
} from 'src/app/services/quiz.service';

type Difficulty = 'easy' | 'medium' | 'hard';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  imports: [CommonModule, RouterModule],
  standalone: true,
})
export class QuizComponent implements OnInit, OnDestroy {
  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const nav = this.router.getCurrentNavigation();
    if (
      (nav?.extras?.state?.['showSummary'] ?? false) &&
      this.quizService.quizAttemptedOnce
    ) {
      this.afterSubmit = true;
      this.correctAnswersByDifficulty =
        this.quizService.quizAttemptData.correctAnswersByDifficulty;
      this.totalNoEachType = this.quizService.quizAttemptData.totalNoEachType;
    }
  }

  subjectList: SubjectType[] = []; // all the subjects to be shown
  isHoveringOnDisabled = false; // tooltip on next button
  correctAnswersByDifficulty = { easy: 0, medium: 0, hard: 0 }; // to be shown in summary
  selectedSubject: SubjectType | null = null;
  timer = 600; // 600 * 1000 ms timer : will submit if time exceeds
  currentDifficulty: Difficulty = 'easy';
  showQuiz = false;
  currentQuestionIndex = 0;
  currentQuestion: Question | null = null;
  questions: Question[] = [];
  userAnswers: { [questionId: string]: string } = {};
  afterSubmit = false;
  totalNoEachType = { easyCount: 0, mediumCount: 0, hardCount: 0 }; // total number of questions of each type
  quizMetadata = { easyCount: 0, mediumCount: 0, hardCount: 0 }; // copy of totalNoEachType . will decrement if a question is answered for each type, used to disable next button if all questions of current difficulty level not answered
  intervalId: any;
  subscription: Subscription | null = null;
  loading: Boolean = false;

  ngOnInit(): void {
    const data = this.route.snapshot.data['subjectList'];
    this.subjectList = data.subjects;
  }
  // format timer string
  get formattedTime(): string {
    const minutes = Math.floor(this.timer / 60);
    const seconds = this.timer % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  }

  // start countdown timer
  startTimer() {
    this.intervalId = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.onSubmitQuiz();
      }
    }, 1000);
  }

  // when user selects a subject
  onSubjectSelect(subject: SubjectType) {
    this.resetQuiz();
    this.selectedSubject = subject;
  }

  onStartQuiz() {
    this.loading = true;
    if (!this.showQuiz) {
      const sub = this.quizService
        .fetchSubjectQuestions(this.selectedSubject)
        ?.subscribe({
          next: (response) => {
            this.quizService.questions = response.questions;
            this.quizMetadata = Object.assign({}, response.metadata);
            this.totalNoEachType = Object.assign({}, response.metadata);
            this.loading = false;
            this.startTimer();
            this.loadQuestions();
          },
          error: (err) => {
            console.error('Error loading questions:', err);
          },
        });

      if (sub) this.subscription = sub;
    }
    this.showQuiz = true;
  }
  // handle next button click
  onNextClick() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.setCurrentQuestion(this.currentQuestionIndex + 1);
    }
  }

  // check whether next button should be disabled
  isNextButtonDisabled(): boolean {
    const isLast = this.currentQuestionIndex === this.questions.length - 1;
    const isNextDiff =
      this.questions[this.currentQuestionIndex + 1]?.difficulty !==
      this.currentDifficulty;
    const remaining = this.quizMetadata[this.getDifficultyKey()];

    return (
      (!isLast && isNextDiff && remaining > 0) ||
      (isLast && this.quizMetadata.hardCount > 0)
    );
  }

  // handle previous button click
  onPrevClick() {
    if (this.currentQuestionIndex > 0) {
      this.setCurrentQuestion(this.currentQuestionIndex - 1);
    }
  }

  // load all questions for the selected subject
  loadQuestions() {
    if (!this.selectedSubject) return;
    this.questions = this.quizService.questions;
    this.setCurrentQuestion(0);
  }

  // submit quiz to backend
  onSubmitQuiz() {
    if (!this.selectedSubject) return;

    this.quizService
      .submitQuiz(this.userAnswers, this.selectedSubject)
      .subscribe({
        next: (res) => {
          this.correctAnswersByDifficulty.easy = res.easy;
          this.correctAnswersByDifficulty.medium = res.medium;
          this.correctAnswersByDifficulty.hard = res.hard;
          this.quizService.quizAttemptedOnce = true;
          this.quizService.quizAttemptData = {
            correctAnswersByDifficulty: { ...this.correctAnswersByDifficulty },
            totalNoEachType: { ...this.totalNoEachType },
          };
        },
        error: (err) => {
          console.error('Error submitting score:', err);
        },
      });

    this.showQuiz = false;
    this.afterSubmit = true;
    clearInterval(this.intervalId);
  }

  // when user selects an answer
  selectAnswer(optionId: string) {
    if (this.currentQuestion && !this.userAnswers[this.currentQuestion.id]) {
      this.quizMetadata[this.getDifficultyKey()]--;
    }
    if (this.currentQuestion) {
      this.userAnswers[this.currentQuestion.id] = optionId;
    }
  }

  // return letter A, B, C, D for option index
  getOptionLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }

  // set current question by index
  private setCurrentQuestion(index: number) {
    this.currentQuestionIndex = index;
    this.currentQuestion = this.questions[index];
    this.currentDifficulty = this.questions[index].difficulty;
  }

  // get metadata key for current difficulty
  private getDifficultyKey(): 'easyCount' | 'mediumCount' | 'hardCount' {
    return `${this.currentDifficulty}Count` as const;
  }

  // reset internal state for new subject
  private resetQuiz() {
    this.questions = [];
    this.userAnswers = {};
    this.showQuiz = false;
    this.currentQuestion = null;
    this.currentQuestionIndex = 0;
    this.correctAnswersByDifficulty = { easy: 0, medium: 0, hard: 0 };
    this.afterSubmit = false;
    this.timer = 600;
    clearInterval(this.intervalId);
  }

  // clean up subscriptions
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
    this.selectedSubject = null;
    clearInterval(this.intervalId);
  }
}
