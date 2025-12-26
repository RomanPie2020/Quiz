import { Router } from 'express';
import * as quizController from '../controllers/quizController';

const router = Router();

router.post('/', quizController.createQuiz);
router.get('/', quizController.getQuizzes);
router.get('/:id', quizController.getQuizById);
router.delete('/:id', quizController.deleteQuizById);

export default router;
