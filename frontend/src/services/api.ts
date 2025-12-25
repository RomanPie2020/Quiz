import { CreateQuizDto, Quiz, QuizListItem } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function getQuizzes(): Promise<QuizListItem[]> {
  const response = await fetch(`${API_URL}/quizzes`, {
    cache: 'no-store',
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch quizzes');
  }
  
  return response.json();
}

export async function getQuiz(id: string): Promise<Quiz> {
  const response = await fetch(`${API_URL}/quizzes/${id}`, {
    cache: 'no-store',
  });
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Quiz not found');
    }
    throw new Error('Failed to fetch quiz');
  }
  
  return response.json();
}

export async function createQuiz(data: CreateQuizDto): Promise<Quiz> {
  const response = await fetch(`${API_URL}/quizzes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create quiz');
  }
  
  return response.json();
}

export async function deleteQuiz(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/quizzes/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete quiz');
  }
}
