'use client';

import { deleteQuiz, getQuiz } from '@/services/api';
import type { Quiz } from '@/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';

interface Props {
  params: Promise<{ id: string }>;
}

export default function QuizDetailPage({ params }: Props) {
  const { id } = use(params);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function loadQuiz() {
      try {
        setLoading(true);
        const data = await getQuiz(id);
        setQuiz(data);
        setError(null);
      } catch (err) {
        setError('Failed to load quiz');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadQuiz();
  }, [id]);

  async function handleDelete() {
    if (!quiz) return;
    if (!confirm('Are you sure you want to delete this quiz?')) return;
    
    try {
      setDeleting(true);
      await deleteQuiz(quiz.id);
      router.push('/quizzes');
    } catch (err) {
      alert('Failed to delete quiz');
      console.error(err);
      setDeleting(false);
    }
  }

  function getQuestionTypeBadge(type: string) {
    switch (type) {
      case 'boolean':
        return <span className="badge badge-boolean">True/False</span>;
      case 'input':
        return <span className="badge badge-input">Text Input</span>;
      case 'checkbox':
        return <span className="badge badge-checkbox">Multiple Choice</span>;
      default:
        return <span className="badge badge-primary">{type}</span>;
    }
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  if (loading) {
    return (
      <div className="container">
        <div className="loading" style={{ minHeight: '400px' }}>
          <div className="loading-spinner"></div>
          <span>Loading quiz...</span>
        </div>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="container">
        <div className="empty-state">
          <svg className="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <h3>Quiz Not Found</h3>
          <p>The quiz you&apos;re looking for doesn&apos;t exist or has been deleted.</p>
          <Link href="/quizzes" className="btn btn-primary">
            Back to Quizzes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in">
      {/* Header */}
      <div style={{ padding: '40px 0' }}>
        <Link 
          href="/quizzes" 
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px',
            color: 'var(--text-secondary)',
            marginBottom: '16px',
            fontSize: '0.9375rem'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Quizzes
        </Link>
        
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ marginBottom: '12px' }}>{quiz.title}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
              <span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px', verticalAlign: 'middle' }}>
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                Created {formatDate(quiz.createdAt)}
              </span>
              <span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px', verticalAlign: 'middle' }}>
                  <path d="M9 11l3 3L22 4"/>
                  <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                </svg>
                {quiz.questions.length} question{quiz.questions.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
          
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="btn btn-danger"
          >
            {deleting ? (
              <>
                <div className="loading-spinner" style={{ width: '16px', height: '16px', borderWidth: '2px' }}></div>
                Deleting...
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                </svg>
                Delete Quiz
              </>
            )}
          </button>
        </div>
      </div>

      {/* Questions */}
      <section style={{ paddingBottom: '60px' }}>
        <h2 style={{ marginBottom: '24px', fontSize: '1.5rem' }}>Questions</h2>
        
        {quiz.questions.map((question, index) => (
          <div key={question.id} className="question-card animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
            <div className="question-header">
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', flex: 1 }}>
                <div className="question-number">{index + 1}</div>
                <div style={{ flex: 1 }}>
                  <div className="question-text">{question.text}</div>
                </div>
              </div>
              {getQuestionTypeBadge(question.type)}
            </div>
            
            <div className="question-options">
              {question.options.map((option) => (
                <div 
                  key={option.id} 
                  className={`option-item ${option.isCorrect ? 'correct' : ''}`}
                >
                  <div className="option-indicator">
                    {option.isCorrect && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" style={{ display: 'block', margin: '0' }}>
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    )}
                  </div>
                  <span className="option-text">{option.text}</span>
                  {option.isCorrect && (
                    <span style={{ 
                      marginLeft: 'auto', 
                      fontSize: '0.75rem', 
                      color: 'var(--success)',
                      fontWeight: 600 
                    }}>
                      Correct Answer
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
