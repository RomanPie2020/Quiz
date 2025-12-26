import styles from '../CreateQuiz.module.css';
import { QuestionForm, QuestionType } from '../utils';
import { QuestionOptions } from './QuestionOptions';

interface QuestionCardProps {
  question: QuestionForm;
  index: number;
  totalQuestions: number;
  onChangeType: (id: string, type: QuestionType) => void;
  onRemove: (id: string) => void;
  onUpdateText: (id: string, text: string) => void;
  onToggleCorrect: (questionId: string, optionId: string) => void;
  onUpdateOptionText: (questionId: string, optionId: string, text: string) => void;
  onRemoveOption: (questionId: string, optionId: string) => void;
  onAddOption: (questionId: string) => void;
}

export function QuestionCard({
  question, index, totalQuestions, onChangeType, onRemove, onUpdateText,
  onToggleCorrect, onUpdateOptionText, onRemoveOption, onAddOption
}: QuestionCardProps) {
  return (
    <div className="question-builder">
      <div className="question-builder-header">
        <span className="question-builder-number">Question {index + 1}</span>
        <div className={styles.typeWaitWrapper}>
          <select
            className={`input select ${styles.typeSelect}`}
            value={question.type}
            onChange={(e) => onChangeType(question.id, e.target.value as QuestionType)}
          >
            <option value="boolean">True/False</option>
            <option value="input">Text Input</option>
            <option value="checkbox">Multiple Choice</option>
          </select>
          {totalQuestions > 1 && (
            <button
              type="button"
              onClick={() => onRemove(question.id)}
              className="btn btn-icon btn-danger"
              title="Remove question"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className={`input-group ${styles.questionTextGroup}`}>
        <label className="input-label">Question Text</label>
        <input
          type="text"
          className="input"
          placeholder="Enter your question..."
          value={question.text}
          onChange={(e) => onUpdateText(question.id, e.target.value)}
        />
      </div>

      <QuestionOptions
        question={question}
        onToggleCorrect={onToggleCorrect}
        onUpdateOptionText={onUpdateOptionText}
        onRemoveOption={onRemoveOption}
        onAddOption={onAddOption}
      />
    </div>
  );
}
