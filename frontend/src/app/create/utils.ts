export type QuestionType = 'boolean' | 'input' | 'checkbox';

export interface QuestionForm {
  id: string;
  text: string;
  type: QuestionType;
  options: { id: string; text: string; isCorrect: boolean }[];
}

export function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

export function createDefaultQuestion(type: QuestionType = 'boolean'): QuestionForm {
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
