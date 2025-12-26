import styles from '../CreateQuiz.module.css';
import { QuestionForm } from '../utils';

interface QuestionOptionsProps {
  question: QuestionForm;
  onToggleCorrect: (questionId: string, optionId: string) => void;
  onUpdateOptionText: (questionId: string, optionId: string, text: string) => void;
  onRemoveOption: (questionId: string, optionId: string) => void;
  onAddOption: (questionId: string) => void;
}

export function QuestionOptions({
  question,
  onToggleCorrect,
  onUpdateOptionText,
  onRemoveOption,
  onAddOption
}: QuestionOptionsProps) {
  return (
    <div>
      <label className={`input-label ${styles.optionsLabel}`}>
        {question.type === 'input' ? 'Correct Answer' : 'Answer Options'}
        {question.type === 'checkbox' && (
          <span className={styles.checkboxHint}>
            (check all correct answers)
          </span>
        )}
      </label>

      {question.options.map((option, optIndex) => (
        <div key={option.id} className="option-builder">
          {question.type !== 'input' && (
            <button
              type="button"
              onClick={() => onToggleCorrect(question.id, option.id)}
              className={`
                ${styles.optionToggleButton}
                ${option.isCorrect ? styles.optionToggleButtonCorrect : ''}
                ${question.type === 'boolean' ? styles.optionToggleButtonBoolean : styles.optionToggleButtonCheckbox}
              `}
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
            onChange={(e) => onUpdateOptionText(question.id, option.id, e.target.value)}
            disabled={question.type === 'boolean'}
          />
          
          {question.type === 'checkbox' && question.options.length > 2 && (
            <button
              type="button"
              onClick={() => onRemoveOption(question.id, option.id)}
              className={`btn btn-icon btn-secondary ${styles.removeOptionBtn}`}
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
          onClick={() => onAddOption(question.id)}
          className={`add-option-btn ${styles.addOptionBtnWrapper}`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add Option
        </button>
      )}
    </div>
  );
}
