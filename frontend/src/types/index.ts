export interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  text: string;
  type: 'boolean' | 'input' | 'checkbox';
  order: number;
  options: Option[];
}

export interface Quiz {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  questions: Question[];
}

export interface QuizListItem {
  id: string;
  title: string;
  questionCount: number;
  createdAt: string;
}

export interface CreateOptionDto {
  text: string;
  isCorrect: boolean;
}

export interface CreateQuestionDto {
  text: string;
  type: 'boolean' | 'input' | 'checkbox';
  order: number;
  options: CreateOptionDto[];
}

export interface CreateQuizDto {
  title: string;
  questions: CreateQuestionDto[];
}
