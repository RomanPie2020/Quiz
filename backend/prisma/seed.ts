import prisma from '../src/prisma';

async function main() {
  // Clear existing data
  await prisma.option.deleteMany();
  await prisma.question.deleteMany();
  await prisma.quiz.deleteMany();

  // Create sample quiz 1: JavaScript Basics
  const jsQuiz = await prisma.quiz.create({
    data: {
      title: 'JavaScript Fundamentals',
      questions: {
        create: [
          {
            text: 'JavaScript is a dynamically typed language',
            type: 'boolean',
            order: 0,
            options: {
              create: [
                { text: 'True', isCorrect: true },
                { text: 'False', isCorrect: false },
              ],
            },
          },
          {
            text: 'What keyword is used to declare a constant in JavaScript?',
            type: 'input',
            order: 1,
            options: {
              create: [{ text: 'const', isCorrect: true }],
            },
          },
          {
            text: 'Which of the following are valid JavaScript data types?',
            type: 'checkbox',
            order: 2,
            options: {
              create: [
                { text: 'String', isCorrect: true },
                { text: 'Number', isCorrect: true },
                { text: 'Character', isCorrect: false },
                { text: 'Boolean', isCorrect: true },
                { text: 'Float', isCorrect: false },
              ],
            },
          },
        ],
      },
    },
  });

  // Create sample quiz 2: React Basics
  const reactQuiz = await prisma.quiz.create({
    data: {
      title: 'React Essentials',
      questions: {
        create: [
          {
            text: 'React uses a Virtual DOM for better performance',
            type: 'boolean',
            order: 0,
            options: {
              create: [
                { text: 'True', isCorrect: true },
                { text: 'False', isCorrect: false },
              ],
            },
          },
          {
            text: 'What hook is used for side effects in React?',
            type: 'input',
            order: 1,
            options: {
              create: [{ text: 'useEffect', isCorrect: true }],
            },
          },
          {
            text: 'Which of these are React hooks?',
            type: 'checkbox',
            order: 2,
            options: {
              create: [
                { text: 'useState', isCorrect: true },
                { text: 'useQuery', isCorrect: false },
                { text: 'useMemo', isCorrect: true },
                { text: 'useCallback', isCorrect: true },
              ],
            },
          },
        ],
      },
    },
  });

  console.log('✅ Seed data created successfully!');
  console.log(`   - Quiz: ${jsQuiz.title} (ID: ${jsQuiz.id})`);
  console.log(`   - Quiz: ${reactQuiz.title} (ID: ${reactQuiz.id})`);
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
