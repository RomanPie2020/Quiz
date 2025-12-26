'use client';

import { useRouter } from 'next/navigation'
import { QuestionCard } from './components/QuestionCard'
import styles from './CreateQuiz.module.css'
import { useQuizForm } from './useQuizForm'

export default function CreateQuizPage() {
  const router = useRouter();
  const {
    title, setTitle, questions, submitting, errors,
    addQuestion, removeQuestion, updateQuestion, changeQuestionType,
    addOption, removeOption, updateOptionText, toggleCorrectAnswer, submitQuiz
  } = useQuizForm();

  return (
    <div className="container">
      <div className="page-header">
        <h1>Create New Quiz</h1>
        <p>Build your quiz with multiple question types</p>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); submitQuiz(); }}>
        <div className="form-section animate-slide-up">
          <h3 className="form-section-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 20h9"/>
              <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
            </svg>
            Quiz Details
          </h3>
          
          <div className="input-group">
            <label htmlFor="title" className="input-label">Quiz Title</label>
            <input
              id="title" type="text"
              className={`input ${errors.title ? 'input-error' : ''}`}
              placeholder="Enter quiz title..."
              value={title} onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>
        </div>

        <div className={`form-section animate-slide-up`} style={{ animationDelay: '0.1s' }}>
          <div className={styles.questionsHeader}>
            <h3 className={`form-section-title ${styles.questionsTitle}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              Questions ({questions.length})
            </h3>
          </div>

          {errors.questions && <div className={styles.errorBox}>{errors.questions}</div>}

          {questions.map((question, index) => (
            <QuestionCard
              key={question.id}
              question={question}
              index={index}
              totalQuestions={questions.length}
              onChangeType={changeQuestionType}
              onRemove={removeQuestion}
              onUpdateText={(id, text) => updateQuestion(id, { text })}
              onToggleCorrect={toggleCorrectAnswer}
              onUpdateOptionText={updateOptionText}
              onRemoveOption={removeOption}
              onAddOption={addOption}
            />
          ))}

          <div className={styles.addTypeButtons}>
            {['boolean', 'input', 'checkbox'].map((type) => (
              <button
                key={type} type="button"
                onClick={() => addQuestion(type as any)}
                className={`btn btn-secondary ${styles.addTypeButton}`}
              >
                {type === 'boolean' ? 'True/False' : type === 'input' ? 'Text Input' : 'Multiple Choice'}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.formActions}>
          <button type="button" onClick={() => router.back()} className="btn btn-secondary">Cancel</button>
          <button type="submit" disabled={submitting} className={`btn btn-primary ${styles.submitButton}`}>
            {submitting ? (
              <>
                 <div className={`loading-spinner ${styles.spinner}`}></div> Creating...
              </>
            ) : 'Create Quiz'}
          </button>
        </div>
      </form>
    </div>
  );
}
