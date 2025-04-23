import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
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
  styleUrls: ['./quiz.component.css'],
  imports: [CommonModule, RouterModule],
  standalone: true,
})
export class QuizComponent implements OnInit, OnDestroy {
  constructor(private quizService: QuizService) {
    this.subjectList = this.quizService.subjectList;
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
  errorMessage: string = ''; // error message to show if API fails
  subscription: Subscription | null = null;

  // format timer string
  get formattedTime(): string {
    const minutes = Math.floor(this.timer / 60);
    const seconds = this.timer % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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

  ngOnInit(): void {
    this.quizService.setSubject(null);
  }

  // when user selects a subject
  onSelect(subject: SubjectType) {
    this.resetQuiz();
    this.selectedSubject = subject;

    const sub = this.quizService.setSubject(subject)?.subscribe({
      next: (response) => {
        console.log('API Response: ', response);
        this.quizService.questions = response.questions;
        this.quizMetadata = response.metadata;
        this.totalNoEachType = { ...this.quizMetadata };
      },
      error: (err) => {
        console.error('Error loading questions:', err);
        this.errorMessage = 'Failed to load questions. Please try again later.';
      },
    });

    if (sub) this.subscription = sub;
  }

  // handle next button click
  onNextClick() {
    if (!this.showQuiz) {
      this.startTimer();
      this.loadQuestions();
      this.showQuiz = true;
    } else if (this.currentQuestionIndex < this.questions.length - 1) {
      this.setCurrentQuestion(this.currentQuestionIndex + 1);
    }
  }

  // check whether next button should be disabled
  isNextButtonDisabled(): boolean {
    const isLast = this.currentQuestionIndex === this.questions.length - 1;
    const isNextDiff = this.questions[this.currentQuestionIndex + 1]?.difficulty !== this.currentDifficulty;
    const remaining = this.quizMetadata[this.getDifficultyKey()];

    return (!isLast && isNextDiff && remaining > 0) || (isLast && this.quizMetadata.hardCount > 0);
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

    this.quizService.submitQuiz(this.userAnswers, this.selectedSubject).subscribe({
      next: (res) => {
        console.log('Score submitted:', res);
        this.correctAnswersByDifficulty.easy = res.easy;
        this.correctAnswersByDifficulty.medium = res.medium;
        this.correctAnswersByDifficulty.hard = res.hard;
      },
      error: (err) => {
        console.error('Error submitting score:', err);
        this.errorMessage = 'Failed to submit quiz. Please try again later.';
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
    this.errorMessage = '';
  }

  // clean up subscriptions
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
    this.selectedSubject = null;
    clearInterval(this.intervalId);
  }
}


// questions1: Record<SubjectType, DifficultyLevel> = {
//   History: {
//     easy: [
//       {
//         q: 'Who was the first President of the United States?',
//         options: [
//           'George Washington',
//           'Abraham Lincoln',
//           'Thomas Jefferson',
//           'John Adams',
//         ],
//         correctIndex: 0,
//       },
//       {
//         q: 'Which empire built the pyramids?',
//         options: ['Roman', 'Egyptian', 'Greek', 'Persian'],
//         correctIndex: 1,
//       },
//       {
//         q: 'What year did World War II end?',
//         options: ['1945', '1939', '1918', '1950'],
//         correctIndex: 0,
//       },
//       {
//         q: 'Who discovered America in 1492?',
//         options: [
//           'Christopher Columbus',
//           'Marco Polo',
//           'Vasco da Gama',
//           'Ferdinand Magellan',
//         ],
//         correctIndex: 0,
//       },
//       {
//         q: 'Which war was fought between the North and South regions in the United States?',
//         options: [
//           'Civil War',
//           'World War I',
//           'Revolutionary War',
//           'Vietnam War',
//         ],
//         correctIndex: 0,
//       },
//     ],
//     medium: [
//       {
//         q: 'In which year did the French Revolution begin?',
//         options: ['1789', '1776', '1804', '1812'],
//         correctIndex: 0,
//       },
//       {
//         q: 'Who was the leader of the Soviet Union during World War II?',
//         options: ['Stalin', 'Lenin', 'Gorbachev', 'Trotsky'],
//         correctIndex: 0,
//       },
//       {
//         q: 'Which dynasty built the Great Wall of China?',
//         options: ['Qin', 'Han', 'Tang', 'Ming'],
//         correctIndex: 0,
//       },
//       {
//         q: 'The Treaty of Versailles was signed after which war?',
//         options: ['WWI', 'WWII', 'Napoleonic Wars', 'Cold War'],
//         correctIndex: 0,
//       },
//       {
//         q: 'Who was known as the Iron Lady?',
//         options: [
//           'Margaret Thatcher',
//           'Indira Gandhi',
//           'Angela Merkel',
//           'Golda Meir',
//         ],
//         correctIndex: 0,
//       },
//     ],
//     hard: [
//       {
//         q: 'When did the Byzantine Empire fall?',
//         options: ['1453', '1492', '1415', '1501'],
//         correctIndex: 0,
//       },
//       {
//         q: 'Which Roman Emperor was the first to convert to Christianity?',
//         options: ['Constantine', 'Nero', 'Augustus', 'Caligula'],
//         correctIndex: 0,
//       },
//       {
//         q: 'Who led the Haitian Revolution?',
//         options: [
//           'Toussaint Louverture',
//           'Simon Bolivar',
//           'Che Guevara',
//           'Jean-Jacques Dessalines',
//         ],
//         correctIndex: 0,
//       },
//       {
//         q: "Which treaty ended the Thirty Years' War?",
//         options: [
//           'Treaty of Westphalia',
//           'Treaty of Versailles',
//           'Treaty of Paris',
//           'Treaty of Utrecht',
//         ],
//         correctIndex: 0,
//       },
//       {
//         q: 'In which battle was Napoleon defeated in 1815?',
//         options: ['Waterloo', 'Austerlitz', 'Trafalgar', 'Leipzig'],
//         correctIndex: 0,
//       },
//     ],
//   },

//   GK: {
//     easy: [
//       {
//         q: 'What is the capital of India?',
//         options: ['New Delhi', 'Mumbai', 'Kolkata', 'Chennai'],
//         correctIndex: 0,
//       },
//       {
//         q: 'How many continents are there?',
//         options: ['7', '5', '6', '8'],
//         correctIndex: 0,
//       },
//       {
//         q: 'Which planet is known as the Red Planet?',
//         options: ['Mars', 'Earth', 'Jupiter', 'Venus'],
//         correctIndex: 0,
//       },
//       {
//         q: 'How many days are there in a leap year?',
//         options: ['366', '365', '364', '360'],
//         correctIndex: 0,
//       },
//       {
//         q: "Who wrote 'Harry Potter'?",
//         options: [
//           'J.K. Rowling',
//           'J.R.R. Tolkien',
//           'Stephen King',
//           'George R.R. Martin',
//         ],
//         correctIndex: 0,
//       },
//     ],
//     medium: [
//       {
//         q: 'What is the smallest country in the world?',
//         options: ['Vatican City', 'Monaco', 'San Marino', 'Liechtenstein'],
//         correctIndex: 0,
//       },
//       {
//         q: 'What is the boiling point of water in Celsius?',
//         options: ['100', '90', '80', '110'],
//         correctIndex: 0,
//       },
//       {
//         q: 'Who was the first man in space?',
//         options: [
//           'Yuri Gagarin',
//           'Neil Armstrong',
//           'Buzz Aldrin',
//           'Alan Shepard',
//         ],
//         correctIndex: 0,
//       },
//       {
//         q: 'What is the currency of Japan?',
//         options: ['Yen', 'Won', 'Dollar', 'Euro'],
//         correctIndex: 0,
//       },
//       {
//         q: 'What is the chemical symbol for Gold?',
//         options: ['Au', 'Ag', 'Gd', 'Go'],
//         correctIndex: 0,
//       },
//     ],
//     hard: [
//       {
//         q: 'Who won the Nobel Peace Prize in 2021?',
//         options: [
//           'Maria Ressa & Dmitry Muratov',
//           'Greta Thunberg',
//           'Abiy Ahmed',
//           'Malala Yousafzai',
//         ],
//         correctIndex: 0,
//       },
//       {
//         q: 'Which element has the highest melting point?',
//         options: ['Tungsten', 'Iron', 'Carbon', 'Platinum'],
//         correctIndex: 0,
//       },
//       {
//         q: 'Who painted the ceiling of the Sistine Chapel?',
//         options: [
//           'Michelangelo',
//           'Leonardo da Vinci',
//           'Raphael',
//           'Donatello',
//         ],
//         correctIndex: 0,
//       },
//       {
//         q: 'What is the hardest natural substance?',
//         options: ['Diamond', 'Quartz', 'Topaz', 'Corundum'],
//         correctIndex: 0,
//       },
//       {
//         q: 'Which country is known as the Land of the Thunder Dragon?',
//         options: ['Bhutan', 'Nepal', 'Tibet', 'Mongolia'],
//         correctIndex: 0,
//       },
//     ],
//   },

//   Geography: {
//     easy: [
//       {
//         q: 'Which is the largest ocean in the world?',
//         options: ['Pacific', 'Atlantic', 'Indian', 'Arctic'],
//         correctIndex: 0,
//       },
//       {
//         q: 'Which continent is known as the Dark Continent?',
//         options: ['Africa', 'Asia', 'Australia', 'South America'],
//         correctIndex: 0,
//       },
//       {
//         q: 'Which is the tallest mountain in the world?',
//         options: ['Mount Everest', 'K2', 'Kangchenjunga', 'Makalu'],
//         correctIndex: 0,
//       },
//       {
//         q: 'Which river is the longest in the world?',
//         options: ['Nile', 'Amazon', 'Yangtze', 'Mississippi'],
//         correctIndex: 0,
//       },
//       {
//         q: 'What is the capital of France?',
//         options: ['Paris', 'Berlin', 'Rome', 'Madrid'],
//         correctIndex: 0,
//       },
//     ],
//     medium: [
//       {
//         q: 'Which country has the most number of time zones?',
//         options: ['France', 'Russia', 'USA', 'China'],
//         correctIndex: 0,
//       },
//       {
//         q: 'Which desert is the largest in the world?',
//         options: ['Antarctic', 'Sahara', 'Arctic', 'Gobi'],
//         correctIndex: 0,
//       },
//       {
//         q: 'What is the deepest point on Earth?',
//         options: [
//           'Mariana Trench',
//           'Tonga Trench',
//           'Java Trench',
//           'Puerto Rico Trench',
//         ],
//         correctIndex: 0,
//       },
//       {
//         q: 'Which country is both in Europe and Asia?',
//         options: ['Turkey', 'Russia', 'Kazakhstan', 'All of the above'],
//         correctIndex: 3,
//       },
//       {
//         q: 'Which country has the most volcanoes?',
//         options: ['Indonesia', 'Japan', 'USA', 'Iceland'],
//         correctIndex: 0,
//       },
//     ],
//     hard: [
//       {
//         q: 'Which city is known as the highest capital in the world?',
//         options: ['La Paz', 'Quito', 'Thimphu', 'Bogotá'],
//         correctIndex: 0,
//       },
//       {
//         q: 'What is the name of the tectonic plate on which India lies?',
//         options: [
//           'Indian Plate',
//           'Eurasian Plate',
//           'Indo-Australian Plate',
//           'African Plate',
//         ],
//         correctIndex: 2,
//       },
//       {
//         q: 'Which country has no rivers?',
//         options: ['Saudi Arabia', 'Libya', 'Oman', 'Kuwait'],
//         correctIndex: 0,
//       },
//       {
//         q: 'Which lake is the deepest in the world?',
//         options: ['Baikal', 'Tanganyika', 'Superior', 'Victoria'],
//         correctIndex: 0,
//       },
//       {
//         q: 'Which U.S. state has the most coastline?',
//         options: ['Alaska', 'Florida', 'California', 'Hawaii'],
//         correctIndex: 0,
//       },
//     ],
//   },
// };

// questions = {
//   History: [
//     {
//       q: 'Who was the first President of the United States?',
//       options: [
//         'George Washington',
//         'Abraham Lincoln',
//         'Thomas Jefferson',
//         'John Adams',
//       ],
//       correctIndex: 0,
//       difficulty: 'easy',
//     },
//     {
//       q: 'Which empire built the pyramids?',
//       options: ['Roman', 'Egyptian', 'Greek', 'Persian'],
//       correctIndex: 1,
//       difficulty: 'easy',
//     },
//     {
//       q: 'What year did World War II end?',
//       options: ['1945', '1939', '1918', '1950'],
//       correctIndex: 0,
//       difficulty: 'easy',
//     },
//     {
//       q: 'Who discovered America in 1492?',
//       options: [
//         'Christopher Columbus',
//         'Marco Polo',
//         'Vasco da Gama',
//         'Ferdinand Magellan',
//       ],
//       correctIndex: 0,
//       difficulty: 'easy',
//     },
//     {
//       q: 'Which war was fought between the North and South regions in the United States?',
//       options: [
//         'Civil War',
//         'World War I',
//         'Revolutionary War',
//         'Vietnam War',
//       ],
//       correctIndex: 0,
//       difficulty: 'easy',
//     },
//     {
//       q: 'In which year did the French Revolution begin?',
//       options: ['1789', '1776', '1804', '1812'],
//       correctIndex: 0,
//       difficulty: 'medium',
//     },
//     {
//       q: 'Who was the leader of the Soviet Union during World War II?',
//       options: ['Stalin', 'Lenin', 'Gorbachev', 'Trotsky'],
//       correctIndex: 0,
//       difficulty: 'medium',
//     },
//     {
//       q: 'Which dynasty built the Great Wall of China?',
//       options: ['Qin', 'Han', 'Tang', 'Ming'],
//       correctIndex: 0,
//       difficulty: 'medium',
//     },
//     {
//       q: 'The Treaty of Versailles was signed after which war?',
//       options: ['WWI', 'WWII', 'Napoleonic Wars', 'Cold War'],
//       correctIndex: 0,
//       difficulty: 'medium',
//     },
//     {
//       q: 'Who was known as the Iron Lady?',
//       options: [
//         'Margaret Thatcher',
//         'Indira Gandhi',
//         'Angela Merkel',
//         'Golda Meir',
//       ],
//       correctIndex: 0,
//       difficulty: 'medium',
//     },
//     {
//       q: 'When did the Byzantine Empire fall?',
//       options: ['1453', '1492', '1415', '1501'],
//       correctIndex: 0,
//       difficulty: 'hard',
//     },
//     {
//       q: 'Which Roman Emperor was the first to convert to Christianity?',
//       options: ['Constantine', 'Nero', 'Augustus', 'Caligula'],
//       correctIndex: 0,
//       difficulty: 'hard',
//     },
//     {
//       q: 'Who led the Haitian Revolution?',
//       options: [
//         'Toussaint Louverture',
//         'Simon Bolivar',
//         'Che Guevara',
//         'Jean-Jacques Dessalines',
//       ],
//       correctIndex: 0,
//       difficulty: 'hard',
//     },
//     {
//       q: "Which treaty ended the Thirty Years' War?",
//       options: [
//         'Treaty of Westphalia',
//         'Treaty of Versailles',
//         'Treaty of Paris',
//         'Treaty of Utrecht',
//       ],
//       correctIndex: 0,
//       difficulty: 'hard',
//     },
//     {
//       q: 'In which battle was Napoleon defeated in 1815?',
//       options: ['Waterloo', 'Austerlitz', 'Trafalgar', 'Leipzig'],
//       correctIndex: 0,
//       difficulty: 'hard',
//     },
//   ],
//   GK: [
//     {
//       q: 'What is the capital of India?',
//       options: ['New Delhi', 'Mumbai', 'Kolkata', 'Chennai'],
//       correctIndex: 0,
//       difficulty: 'easy',
//     },
//     {
//       q: 'How many continents are there?',
//       options: ['7', '5', '6', '8'],
//       correctIndex: 0,
//       difficulty: 'easy',
//     },
//     {
//       q: 'Which planet is known as the Red Planet?',
//       options: ['Mars', 'Earth', 'Jupiter', 'Venus'],
//       correctIndex: 0,
//       difficulty: 'easy',
//     },
//     {
//       q: 'How many days are there in a leap year?',
//       options: ['366', '365', '364', '360'],
//       correctIndex: 0,
//       difficulty: 'easy',
//     },
//     {
//       q: "Who wrote 'Harry Potter'?",
//       options: [
//         'J.K. Rowling',
//         'J.R.R. Tolkien',
//         'Stephen King',
//         'George R.R. Martin',
//       ],
//       correctIndex: 0,
//       difficulty: 'easy',
//     },
//     {
//       q: 'What is the smallest country in the world?',
//       options: ['Vatican City', 'Monaco', 'San Marino', 'Liechtenstein'],
//       correctIndex: 0,
//       difficulty: 'medium',
//     },
//     {
//       q: 'What is the boiling point of water in Celsius?',
//       options: ['100', '90', '80', '110'],
//       correctIndex: 0,
//       difficulty: 'medium',
//     },
//     {
//       q: 'Who was the first man in space?',
//       options: [
//         'Yuri Gagarin',
//         'Neil Armstrong',
//         'Buzz Aldrin',
//         'Alan Shepard',
//       ],
//       correctIndex: 0,
//       difficulty: 'medium',
//     },
//     {
//       q: 'What is the currency of Japan?',
//       options: ['Yen', 'Won', 'Dollar', 'Euro'],
//       correctIndex: 0,
//       difficulty: 'medium',
//     },
//     {
//       q: 'What is the chemical symbol for Gold?',
//       options: ['Au', 'Ag', 'Gd', 'Go'],
//       correctIndex: 0,
//       difficulty: 'medium',
//     },
//     {
//       q: 'Who won the Nobel Peace Prize in 2021?',
//       options: [
//         'Maria Ressa & Dmitry Muratov',
//         'Greta Thunberg',
//         'Abiy Ahmed',
//         'Malala Yousafzai',
//       ],
//       correctIndex: 0,
//       difficulty: 'hard',
//     },
//     {
//       q: 'Which element has the highest melting point?',
//       options: ['Tungsten', 'Iron', 'Carbon', 'Platinum'],
//       correctIndex: 0,
//       difficulty: 'hard',
//     },
//     {
//       q: 'Who painted the ceiling of the Sistine Chapel?',
//       options: ['Michelangelo', 'Leonardo da Vinci', 'Raphael', 'Donatello'],
//       correctIndex: 0,
//       difficulty: 'hard',
//     },
//     {
//       q: 'What is the hardest natural substance?',
//       options: ['Diamond', 'Quartz', 'Topaz', 'Corundum'],
//       correctIndex: 0,
//       difficulty: 'hard',
//     },
//     {
//       q: 'Which country is known as the Land of the Thunder Dragon?',
//       options: ['Bhutan', 'Nepal', 'Tibet', 'Mongolia'],
//       correctIndex: 0,
//       difficulty: 'hard',
//     },
//   ],
//   Geography: [
//     {
//       q: 'Which is the largest ocean in the world?',
//       options: ['Pacific', 'Atlantic', 'Indian', 'Arctic'],
//       correctIndex: 0,
//       difficulty: 'easy',
//     },
//     {
//       q: 'Which continent is known as the Dark Continent?',
//       options: ['Africa', 'Asia', 'Australia', 'South America'],
//       correctIndex: 0,
//       difficulty: 'easy',
//     },
//     {
//       q: 'Which is the tallest mountain in the world?',
//       options: ['Mount Everest', 'K2', 'Kangchenjunga', 'Makalu'],
//       correctIndex: 0,
//       difficulty: 'easy',
//     },
//     {
//       q: 'Which river is the longest in the world?',
//       options: ['Nile', 'Amazon', 'Yangtze', 'Mississippi'],
//       correctIndex: 0,
//       difficulty: 'easy',
//     },
//     {
//       q: 'What is the capital of France?',
//       options: ['Paris', 'Berlin', 'Rome', 'Madrid'],
//       correctIndex: 0,
//       difficulty: 'easy',
//     },
//     {
//       q: 'Which country has the most number of time zones?',
//       options: ['France', 'Russia', 'USA', 'China'],
//       correctIndex: 0,
//       difficulty: 'medium',
//     },
//     {
//       q: 'Which desert is the largest in the world?',
//       options: ['Antarctic', 'Sahara', 'Arctic', 'Gobi'],
//       correctIndex: 0,
//       difficulty: 'medium',
//     },
//     {
//       q: 'What is the deepest point on Earth?',
//       options: [
//         'Mariana Trench',
//         'Tonga Trench',
//         'Java Trench',
//         'Puerto Rico Trench',
//       ],
//       correctIndex: 0,
//       difficulty: 'medium',
//     },
//     {
//       q: 'Which country is both in Europe and Asia?',
//       options: ['Turkey', 'Russia', 'Kazakhstan', 'All of the above'],
//       correctIndex: 3,
//       difficulty: 'medium',
//     },
//     {
//       q: 'Which country has the most volcanoes?',
//       options: ['Indonesia', 'Japan', 'USA', 'Iceland'],
//       correctIndex: 0,
//       difficulty: 'medium',
//     },
//     {
//       q: 'Which city is known as the highest capital in the world?',
//       options: ['La Paz', 'Quito', 'Thimphu', 'Bogotá'],
//       correctIndex: 0,
//       difficulty: 'hard',
//     },
//     {
//       q: 'What is the name of the tectonic plate on which India lies?',
//       options: [
//         'Indian Plate',
//         'Eurasian Plate',
//         'Indo-Australian Plate',
//         'African Plate',
//       ],
//       correctIndex: 2,
//       difficulty: 'hard',
//     },
//     {
//       q: 'Which country has no rivers?',
//       options: ['Saudi Arabia', 'Libya', 'Oman', 'Kuwait'],
//       correctIndex: 0,
//       difficulty: 'hard',
//     },
//     {
//       q: 'Which lake is the deepest in the world?',
//       options: ['Baikal', 'Tanganyika', 'Superior', 'Victoria'],
//       correctIndex: 0,
//       difficulty: 'hard',
//     },
//     {
//       q: 'Which U.S. state has the most coastline?',
//       options: ['Alaska', 'Florida', 'California', 'Hawaii'],
//       correctIndex: 0,
//       difficulty: 'hard',
//     },
//   ],
// };
