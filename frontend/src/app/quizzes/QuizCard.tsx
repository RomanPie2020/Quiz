import { QuizListItem } from '@/types';
import Link from 'next/link';
import React from 'react';

interface QuizCardProps {
  quiz: QuizListItem;
  deleting: boolean;
  onDelete: (e: React.MouseEvent, id: string) => void;
}

export function QuizCard({ quiz, deleting, onDelete }: QuizCardProps) {
  const formatDate = (dateString: string) => 
    new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <Link href={`/quizzes/${quiz.id}`} className="quiz-card">
      <div className="quiz-card-content">
        <h3 className="quiz-card-title">{quiz.title}</h3>
        <div className="quiz-card-meta">
          <span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '4px', verticalAlign: 'middle' }}>
              <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
            </svg>
            {formatDate(quiz.createdAt)}
          </span>
          <span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '4px', verticalAlign: 'middle' }}>
              <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
            </svg>
            {quiz.questionCount} question{quiz.questionCount !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
      <div className="quiz-card-actions">
        <button
          onClick={(e) => onDelete(e, quiz.id)}
          disabled={deleting}
          className="btn btn-icon btn-danger"
          title="Delete quiz"
        >
          {deleting ? (
            <div className="loading-spinner" style={{ width: '18px', height: '18px', borderWidth: '2px' }}></div>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
              <line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>
            </svg>
          )}
        </button>
      </div>
    </Link>
  );
}
