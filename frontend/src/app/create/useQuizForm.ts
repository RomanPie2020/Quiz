import { createQuiz } from '@/services/api';
import { CreateQuestionDto, CreateQuizDto } from '@/types/index';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useQuestionState } from './useQuestionState';

export function useQuizForm() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; questions?: string }>({});
  const qState = useQuestionState();

  const validate = (): boolean => {
    const newErrors: typeof errors = {};
    if (!title.trim()) newErrors.title = 'Quiz title is required';
    
    for (const q of qState.questions) {
      if (!q.text.trim()) {
        newErrors.questions = 'All questions must have text';
        break;
      }
      if ((q.type === 'checkbox' || q.type === 'input') && q.options.some(o => !o.text.trim())) {
        newErrors.questions = 'All options must have text';
        break;
      }
      if (!q.options.some(o => o.isCorrect)) {
        newErrors.questions = 'Each question must have at least one correct answer';
        break;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitQuiz = async () => {
    if (!validate()) return;
    const data: CreateQuizDto = {
      title: title.trim(),
      questions: qState.questions.map((q, index): CreateQuestionDto => ({
        text: q.text.trim(),
        type: q.type,
        order: index,
        options: q.options.map(o => ({
          text: o.text.trim(),
          isCorrect: o.isCorrect
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
  };

  return { title, setTitle, submitting, errors, ...qState, submitQuiz };
}
