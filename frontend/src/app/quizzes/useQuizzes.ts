import { deleteQuiz as deleteQuizApi, getQuizzes } from '@/services/api';
import { QuizListItem } from '@/types';
import { useEffect, useState } from 'react';

export function useQuizzes() {
  const [quizzes, setQuizzes] = useState<QuizListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const loadQuizzes = async () => {
    try {
      setLoading(true);
      const data = await getQuizzes();
      setQuizzes(data);
      setError(null);
    } catch (err) {
      setError('Failed to load quizzes. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const removeQuiz = async (id: string) => {
    if (!confirm('Are you sure you want to delete this quiz?')) return;
    try {
      setDeleting(id);
      await deleteQuizApi(id);
      setQuizzes(prev => prev.filter(q => q.id !== id));
    } catch (err) {
      alert('Failed to delete quiz');
    } finally {
      setDeleting(null);
    }
  };

  useEffect(() => { loadQuizzes(); }, []);

  return { quizzes, loading, error, deleting, loadQuizzes, removeQuiz };
}
