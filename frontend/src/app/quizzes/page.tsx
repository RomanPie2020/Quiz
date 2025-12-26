'use client';

import Link from 'next/link'
import { QuizCard } from './QuizCard'
import { useQuizzes } from './useQuizzes'

export default function QuizzesPage() {
  const { quizzes, loading, error, deleting, loadQuizzes, removeQuiz } = useQuizzes();

  if (loading) return (
    <div className="container">
      <div className="page-header"><h1>My Quizzes</h1><p>View and manage all your created quizzes</p></div>
      <div className="loading"><div className="loading-spinner"></div><span>Loading quizzes...</span></div>
    </div>
  );

  if (error) return (
    <div className="container">
      <div className="page-header"><h1>My Quizzes</h1><p>View and manage all your created quizzes</p></div>
      <div className="empty-state">
        <svg className="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <h3>Connection Error</h3><p>{error}</p>
        <button onClick={loadQuizzes} className="btn btn-primary">Try Again</button>
      </div>
    </div>
  );

  return (
    <div className="container">
      <div className="page-header"><h1>My Quizzes</h1><p>View and manage all your created quizzes</p></div>
      {quizzes.length === 0 ? (
        <div className="empty-state">
          <svg className="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 12h6M9 16h6M17 21H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          <h3>No Quizzes Yet</h3><p>Create your first quiz to get started</p>
          <Link href="/create" className="btn btn-primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Create Quiz
          </Link>
        </div>
      ) : (
        <div className="quiz-grid animate-fade-in">
          {quizzes.map((quiz) => (
            <QuizCard 
              key={quiz.id} 
              quiz={quiz} 
              deleting={deleting === quiz.id} 
              onDelete={(e) => { e.preventDefault(); removeQuiz(quiz.id); }} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
