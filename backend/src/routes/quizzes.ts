import { Request, Response, Router } from 'express';
import prisma from '../prisma';
import { CreateOptionDto, CreateQuestionDto, CreateQuizDto } from '../types';

const router = Router();

// POST /quizzes - Create a new quiz
router.post('/', async (req: Request, res: Response) => {
  try {
    const data: CreateQuizDto = req.body;

    if (!data.title || !data.questions || data.questions.length === 0) {
      return res.status(400).json({ 
        error: 'Quiz must have a title and at least one question' 
      });
    }

    const quiz = await prisma.quiz.create({
      data: {
        title: data.title,
        questions: {
          create: data.questions.map((q: CreateQuestionDto, index: number) => ({
            text: q.text,
            type: q.type,
            order: q.order ?? index,
            options: {
              create: q.options?.map((o: CreateOptionDto) => ({
                text: o.text,
                isCorrect: o.isCorrect,
              })) ?? [],
            },
          })),
        },
      },
      include: {
        questions: {
          include: {
            options: true,
          },
          orderBy: { order: 'asc' },
        },
      },
    });

    res.status(201).json(quiz);
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({ error: 'Failed to create quiz' });
  }
});

// GET /quizzes - Return list of all quizzes
router.get('/', async (_req: Request, res: Response) => {
  try {
    const quizzes = await prisma.quiz.findMany({
      include: {
        _count: {
          select: { questions: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const response = quizzes.map((quiz) => ({
      id: quiz.id,
      title: quiz.title,
      questionCount: quiz._count.questions,
      createdAt: quiz.createdAt,
    }));

    res.json(response);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
});

// GET /quizzes/:id - Return full details of a quiz
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const quiz = await prisma.quiz.findUnique({
      where: { id },
      include: {
        questions: {
          include: {
            options: true,
          },
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    const response = {
      id: quiz.id,
      title: quiz.title,
      createdAt: quiz.createdAt,
      updatedAt: quiz.updatedAt,
      questions: quiz.questions.map((q) => ({
        id: q.id,
        text: q.text,
        type: q.type,
        order: q.order,
        options: q.options.map((o) => ({
          id: o.id,
          text: o.text,
          isCorrect: o.isCorrect,
        })),
      })),
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching quiz:', error);
    res.status(500).json({ error: 'Failed to fetch quiz' });
  }
});

// DELETE /quizzes/:id - Delete a quiz
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const quiz = await prisma.quiz.findUnique({
      where: { id },
    });

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    await prisma.quiz.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting quiz:', error);
    res.status(500).json({ error: 'Failed to delete quiz' });
  }
});

export default router;
