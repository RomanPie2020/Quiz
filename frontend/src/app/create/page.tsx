'use client';

import { createQuiz } from '@/services/api';
import type { CreateOptionDto, CreateQuestionDto, CreateQuizDto } from '@/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type QuestionType = 'boolean' | 'input' | 'checkbox';

interface QuestionForm {
  id: string;
  text: string;
  type: QuestionType;
  options: { id: string; text: string; isCorrect: boolean }[];
}

function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

function createDefaultQuestion(type: QuestionType = 'boolean'): QuestionForm {
  const id = generateId();
  
  if (type === 'boolean') {
    return {
      id,
      text: '',
      type: 'boolean',
      options: [
        { id: generateId(), text: 'True', isCorrect: true },
        { id: generateId(), text: 'False', isCorrect: false },
      ],
    };
  } else if (type === 'input') {
    return {
      id,
      text: '',
      type: 'input',
      options: [
        { id: generateId(), text: '', isCorrect: true },
      ],
    };
  } else {
    return {
      id,
      text: '',
      type: 'checkbox',
      options: [
        { id: generateId(), text: '', isCorrect: false },
        { id: generateId(), text: '', isCorrect: false },
      ],
    };
  }
}

export default function CreateQuizPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState<QuestionForm[]>([createDefaultQuestion()]);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; questions?: string }>({});

  function addQuestion(type: QuestionType = 'boolean') {
    setQuestions([...questions, createDefaultQuestion(type)]);
  }

  function removeQuestion(id: string) {
    if (questions.length <= 1) return;
    setQuestions(questions.filter(q => q.id !== id));
  }

  function updateQuestion(id: string, updates: Partial<QuestionForm>) {
    setQuestions(questions.map(q => q.id === id ? { ...q, ...updates } : q));
  }

  function changeQuestionType(id: string, newType: QuestionType) {
    const question = questions.find(q => q.id === id);
    if (!question) return;

    let newOptions = question.options;

    if (newType === 'boolean') {
      newOptions = [
        { id: generateId(), text: 'True', isCorrect: true },
        { id: generateId(), text: 'False', isCorrect: false },
      ];
    } else if (newType === 'input') {
      newOptions = [
        { id: generateId(), text: '', isCorrect: true },
      ];
    } else if (question.type !== 'checkbox') {
      newOptions = [
        { id: generateId(), text: '', isCorrect: false },
        { id: generateId(), text: '', isCorrect: false },
      ];
    }

    updateQuestion(id, { type: newType, options: newOptions });
  }

  function addOption(questionId: string) {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;

    const newOption = { id: generateId(), text: '', isCorrect: false };
    updateQuestion(questionId, { options: [...question.options, newOption] });
  }

  function removeOption(questionId: string, optionId: string) {
    const question = questions.find(q => q.id === questionId);
    if (!question || question.options.length <= 2) return;

    updateQuestion(questionId, { 
      options: question.options.filter(o => o.id !== optionId) 
    });
  }

  function updateOption(questionId: string, optionId: string, updates: Partial<CreateOptionDto>) {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;

    updateQuestion(questionId, {
      options: question.options.map(o => o.id === optionId ? { ...o, ...updates } : o)
    });
  }

  function toggleCorrectAnswer(questionId: string, optionId: string) {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;

    if (question.type === 'boolean' || question.type === 'input') {
      // Single correct answer
      updateQuestion(questionId, {
        options: question.options.map(o => ({ ...o, isCorrect: o.id === optionId }))
      });
    } else {
      // Multiple correct answers
      updateQuestion(questionId, {
        options: question.options.map(o => 
          o.id === optionId ? { ...o, isCorrect: !o.isCorrect } : o
        )
      });
    }
  }

  function validate(): boolean {
    const newErrors: typeof errors = {};

    if (!title.trim()) {
      newErrors.title = 'Quiz title is required';
    }

    for (const q of questions) {
      if (!q.text.trim()) {
        newErrors.questions = 'All questions must have text';
        break;
      }
      if (q.type === 'checkbox' || q.type === 'input') {
        const hasEmptyOption = q.options.some(o => !o.text.trim());
        if (hasEmptyOption) {
          newErrors.questions = 'All options must have text';
          break;
        }
      }
      const hasCorrect = q.options.some(o => o.isCorrect);
      if (!hasCorrect) {
        newErrors.questions = 'Each question must have at least one correct answer';
        break;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!validate()) return;

    const data: CreateQuizDto = {
      title: title.trim(),
      questions: questions.map((q, index): CreateQuestionDto => ({
        text: q.text.trim(),
        type: q.type,
        order: index,
        options: q.options.map(o => ({
          text: o.text.trim(),
          isCorrect: o.isCorrect,
        })),
      })),
    };

    try {
      setSubmitting(true);
      const quiz = await createQuiz(data);
      router.push(`/quizzes/${quiz.id}`);
    } catch (err) {
      alert('Failed to create quiz. Make sure the backend server is running.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1>Create New Quiz</h1>
        <p>Build your quiz with multiple question types</p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Quiz Title */}
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
              id="title"
              type="text"
              className={`input ${errors.title ? 'input-error' : ''}`}
              placeholder="Enter quiz title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>
        </div>

        {/* Questions */}
        <div className="form-section animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <h3 className="form-section-title" style={{ margin: 0 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              Questions ({questions.length})
            </h3>
          </div>

          {errors.questions && (
            <div style={{ 
              padding: '12px 16px', 
              background: 'rgba(239, 68, 68, 0.1)', 
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '10px',
              marginBottom: '20px',
              color: '#f87171',
              fontSize: '0.875rem'
            }}>
              {errors.questions}
            </div>
          )}

          {questions.map((question, index) => (
            <div key={question.id} className="question-builder">
              <div className="question-builder-header">
                <span className="question-builder-number">Question {index + 1}</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <select
                    className="input select"
                    value={question.type}
                    onChange={(e) => changeQuestionType(question.id, e.target.value as QuestionType)}
                    style={{ width: 'auto', padding: '8px 40px 8px 12px' }}
                  >
                    <option value="boolean">True/False</option>
                    <option value="input">Text Input</option>
                    <option value="checkbox">Multiple Choice</option>
                  </select>
                  {questions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeQuestion(question.id)}
                      className="btn btn-icon btn-danger"
                      title="Remove question"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              <div className="input-group" style={{ marginBottom: '16px' }}>
                <label className="input-label">Question Text</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter your question..."
                  value={question.text}
                  onChange={(e) => updateQuestion(question.id, { text: e.target.value })}
                />
              </div>

              {/* Options */}
              <div>
                <label className="input-label" style={{ marginBottom: '12px', display: 'block' }}>
                  {question.type === 'input' ? 'Correct Answer' : 'Answer Options'}
                  {question.type === 'checkbox' && (
                    <span style={{ fontWeight: 400, color: 'var(--text-muted)', marginLeft: '8px' }}>
                      (check all correct answers)
                    </span>
                  )}
                </label>

                {question.options.map((option, optIndex) => (
                  <div key={option.id} className="option-builder">
                    {question.type !== 'input' && (
                      <button
                        type="button"
                        onClick={() => toggleCorrectAnswer(question.id, option.id)}
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: question.type === 'boolean' ? '50%' : '6px',
                          border: `2px solid ${option.isCorrect ? 'var(--success)' : 'rgba(255, 255, 255, 0.2)'}`,
                          background: option.isCorrect ? 'var(--success)' : 'transparent',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          transition: 'all 0.15s ease'
                        }}
                        title={option.isCorrect ? 'Correct answer' : 'Mark as correct'}
                      >
                        {option.isCorrect && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        )}
                      </button>
                    )}
                    
                    <input
                      type="text"
                      className="input option-builder-input"
                      placeholder={question.type === 'input' ? 'Enter the correct answer...' : `Option ${optIndex + 1}`}
                      value={option.text}
                      onChange={(e) => updateOption(question.id, option.id, { text: e.target.value })}
                      disabled={question.type === 'boolean'}
                    />
                    
                    {question.type === 'checkbox' && question.options.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeOption(question.id, option.id)}
                        className="btn btn-icon btn-secondary"
                        style={{ width: '32px', height: '32px' }}
                        title="Remove option"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="18" y1="6" x2="6" y2="18"/>
                          <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                      </button>
                    )}
                  </div>
                ))}

                {question.type === 'checkbox' && (
                  <button
                    type="button"
                    onClick={() => addOption(question.id)}
                    className="add-option-btn"
                    style={{ marginTop: '8px' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="5" x2="12" y2="19"/>
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    Add Option
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Add Question Buttons */}
          <div style={{ 
            display: 'flex', 
            gap: '12px', 
            paddingTop: '16px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            marginTop: '8px'
          }}>
            <button
              type="button"
              onClick={() => addQuestion('boolean')}
              className="btn btn-secondary"
              style={{ flex: 1 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              True/False
            </button>
            <button
              type="button"
              onClick={() => addQuestion('input')}
              className="btn btn-secondary"
              style={{ flex: 1 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Text Input
            </button>
            <button
              type="button"
              onClick={() => addQuestion('checkbox')}
              className="btn btn-secondary"
              style={{ flex: 1 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Multiple Choice
            </button>
          </div>
        </div>

        {/* Submit */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          gap: '12px',
          paddingBottom: '60px'
        }}>
          <button
            type="button"
            onClick={() => router.back()}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary"
            style={{ minWidth: '140px' }}
          >
            {submitting ? (
              <>
                <div className="loading-spinner" style={{ width: '16px', height: '16px', borderWidth: '2px' }}></div>
                Creating...
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/>
                  <polyline points="17 21 17 13 7 13 7 21"/>
                  <polyline points="7 3 7 8 15 8"/>
                </svg>
                Create Quiz
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
