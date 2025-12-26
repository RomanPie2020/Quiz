'use client';

import Link from 'next/link'
import { use } from 'react'
import { QuestionDetail } from './QuestionDetail'
import styles from './QuizDetail.module.css'
import { useQuizDetail } from './useQuizDetail'

interface Props { params: Promise<{ id: string }>; }

export default function QuizDetailPage({ params }: Props) {
  const { id } = use(params);
  const { quiz, loading, error, deleting, removeQuiz } = useQuizDetail(id);

  const formatDate = (dateString: string) => 
    new Date(dateString).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  if (loading) return (
    <div className="container">
      <div className={styles.loadingWrapper}><div className="loading-spinner"></div><span>Loading quiz...</span></div>
    </div>
  );

  if (error || !quiz) return (
    <div className="container">
      <div className="empty-state">
        <svg className="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <h3>Quiz Not Found</h3><p>The quiz you&apos;re looking for doesn&apos;t exist or has been deleted.</p>
        <Link href="/quizzes" className="btn btn-primary">Back to Quizzes</Link>
      </div>
    </div>
  );

  return (
    <div className="container animate-fade-in">
      <div className={styles.header}>
        <Link href="/quizzes" className={styles.backLink}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back to Quizzes
        </Link>
        
        <div className={styles.titleWrapper}>
          <div>
            <h1 className={styles.title}>{quiz.title}</h1>
            <div className={styles.meta}>
              <span className={styles.metaItem}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                Created {formatDate(quiz.createdAt)}
              </span>
              <span className={styles.metaItem}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
                {quiz.questions.length} questions
              </span>
            </div>
          </div>
          <button onClick={removeQuiz} disabled={deleting} className="btn btn-danger">
            {deleting ? <div className="loading-spinner" style={{ width: '16px', height: '16px', borderWidth: '2px' }}></div> : 'Delete Quiz'}
          </button>
        </div>
      </div>

      <section className={styles.questionsSection}>
        <h2 className={styles.sectionTitle}>Questions</h2>
        {quiz.questions.map((q, i) => <QuestionDetail key={q.id} question={q} index={i} />)}
      </section>
    </div>
  );
}
