import { Question } from '@/types';

interface QuestionDetailProps {
  question: Question;
  index: number;
}

export function QuestionDetail({ question, index }: QuestionDetailProps) {
  const getBadge = (type: string) => {
    const classes = { boolean: 'badge-boolean', input: 'badge-input', checkbox: 'badge-checkbox' };
    const labels = { boolean: 'True/False', input: 'Text Input', checkbox: 'Multiple Choice' };
    return <span className={`badge ${classes[type as keyof typeof classes] || 'badge-primary'}`}>
      {labels[type as keyof typeof labels] || type}
    </span>;
  };

  return (
    <div className="question-card animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
      <div className="question-header">
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', flex: 1 }}>
          <div className="question-number">{index + 1}</div>
          <div style={{ flex: 1 }}><div className="question-text">{question.text}</div></div>
        </div>
        {getBadge(question.type)}
      </div>
      
      <div className="question-options">
        {question.options.map((option) => (
          <div key={option.id} className={`option-item ${option.isCorrect ? 'correct' : ''}`}>
            <div className="option-indicator">
              {option.isCorrect && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              )}
            </div>
            <span className="option-text">{option.text}</span>
            {option.isCorrect && (
              <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--success)', fontWeight: 600 }}>
                Correct Answer
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
