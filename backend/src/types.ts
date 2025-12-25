export interface CreateOptionDto {
  text: string;
  isCorrect: boolean;
}

export interface CreateQuestionDto {
  text: string;
  type: 'boolean' | 'input' | 'checkbox';
  order: number;
  options?: CreateOptionDto[];
}

export interface CreateQuizDto {
  title: string;
  questions: CreateQuestionDto[];
}

export interface QuizListItem {
  id: string;
  title: string;
  questionCount: number;
  createdAt: Date;
}

export interface QuizDetail {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  questions: {
    id: string;
    text: string;
    type: string;
    order: number;
    options: {
      id: string;
      text: string;
      isCorrect: boolean;
    }[];
  }[];
}
