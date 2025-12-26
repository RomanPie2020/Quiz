import { useState } from 'react';
import { QuestionForm, QuestionType, createDefaultQuestion, generateId } from './utils';

export function useQuestionState() {
  const [questions, setQuestions] = useState<QuestionForm[]>([createDefaultQuestion()]);

  const addQuestion = (type: QuestionType = 'boolean') => {
    setQuestions([...questions, createDefaultQuestion(type)]);
  };

  const removeQuestion = (id: string) => {
    if (questions.length <= 1) return;
    setQuestions(questions.filter(q => q.id !== id));
  };

  const updateQuestion = (id: string, updates: Partial<QuestionForm>) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, ...updates } : q));
  };

  const changeQuestionType = (id: string, newType: QuestionType) => {
    const question = questions.find(q => q.id === id);
    if (!question) return;

    let newOptions = question.options;
    if (newType === 'boolean') {
      newOptions = [
        { id: generateId(), text: 'True', isCorrect: true },
        { id: generateId(), text: 'False', isCorrect: false },
      ];
    } else if (newType === 'input') {
      newOptions = [{ id: generateId(), text: '', isCorrect: true }];
    } else if (question.type !== 'checkbox') {
      newOptions = [
        { id: generateId(), text: '', isCorrect: false },
        { id: generateId(), text: '', isCorrect: false },
      ];
    }
    updateQuestion(id, { type: newType, options: newOptions });
  };

  const addOption = (questionId: string) => {
    const question = questions.find(q => q.id === questionId);
    if (question) {
      const newOption = { id: generateId(), text: '', isCorrect: false };
      updateQuestion(questionId, { options: [...question.options, newOption] });
    }
  };

  const removeOption = (questionId: string, optionId: string) => {
    const question = questions.find(q => q.id === questionId);
    if (question && question.options.length > 2) {
      updateQuestion(questionId, { options: question.options.filter(o => o.id !== optionId) });
    }
  };

  const updateOptionText = (questionId: string, optionId: string, text: string) => {
    const question = questions.find(q => q.id === questionId);
    if (question) {
      updateQuestion(questionId, {
        options: question.options.map(o => o.id === optionId ? { ...o, text } : o)
      });
    }
  };

  const toggleCorrectAnswer = (questionId: string, optionId: string) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;
    const isSingle = question.type === 'boolean' || question.type === 'input';
    updateQuestion(questionId, {
      options: question.options.map(o => ({
        ...o,
        isCorrect: isSingle ? o.id === optionId : (o.id === optionId ? !o.isCorrect : o.isCorrect)
      }))
    });
  };

  return {
    questions, addQuestion, removeQuestion, updateQuestion,
    changeQuestionType, addOption, removeOption, updateOptionText, toggleCorrectAnswer
  };
}
