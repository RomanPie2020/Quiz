import { deleteQuiz as deleteQuizApi, getQuiz } from '@/services/api';
import { Quiz } from '@/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useQuizDetail(id: string) {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        setLoading(true);
        const data = await getQuiz(id);
        setQuiz(data);
        setError(null);
      } catch (err) {
        setError('Failed to load quiz');
      } finally {
        setLoading(false);
      }
    };
    loadQuiz();
  }, [id]);

  const removeQuiz = async () => {
    if (!quiz || !confirm('Are you sure you want to delete this quiz?')) return;
    try {
      setDeleting(true);
      await deleteQuizApi(quiz.id);
      router.push('/quizzes');
    } catch (err) {
      alert('Failed to delete quiz');
      setDeleting(false);
    }
  };

  return { quiz, loading, error, deleting, removeQuiz };
}
