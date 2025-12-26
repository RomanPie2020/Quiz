import { Request, Response } from 'express';
import prisma from '../prisma';
import { CreateQuestionDto, CreateQuizDto } from '../types';

export const createQuiz = async (req: Request, res: Response) => {
  try {
    const data: CreateQuizDto = req.body;
    if (!data.title || !data.questions || data.questions.length === 0) {
      return res.status(400).json({ error: 'Quiz must have a title and at least one question' });
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
              create: q.options?.map((o) => ({ text: o.text, isCorrect: o.isCorrect })) ?? [],
            },
          })),
        },
      },
      include: { questions: { include: { options: true }, orderBy: { order: 'asc' } } },
    });
    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create quiz' });
  }
};

export const getQuizzes = async (_req: Request, res: Response) => {
  try {
    const quizzes = await prisma.quiz.findMany({
      include: { _count: { select: { questions: true } } },
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
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
};

export const getQuizById = async (req: Request, res: Response) => {
  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id: req.params.id },
      include: { questions: { include: { options: true }, orderBy: { order: 'asc' } } },
    });
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
    
    res.json({
      ...quiz,
      questions: quiz.questions.map((q) => ({
        ...q,
        options: q.options.map((o) => ({ id: o.id, text: o.text, isCorrect: o.isCorrect })),
      })),
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quiz' });
  }
};

export const deleteQuizById = async (req: Request, res: Response) => {
  try {
    const quiz = await prisma.quiz.findUnique({ where: { id: req.params.id } });
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
    await prisma.quiz.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete quiz' });
  }
};
