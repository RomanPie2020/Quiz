# Quiz Builder

A full-stack web application for creating and managing custom quizzes with multiple question types.

![Quiz Builder](https://via.placeholder.com/800x400/1a1a2e/8B5CF6?text=Quiz+Builder)

## 🚀 Features

- **Multiple Question Types**: Support for True/False, Text Input, and Multiple Choice questions
- **Dynamic Quiz Builder**: Add, remove, and reorder questions with an intuitive interface
- **Quiz Dashboard**: View all quizzes with question counts and creation dates
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Premium dark theme with glassmorphism effects and smooth animations

## 🛠️ Tech Stack

### Backend
- **Node.js** with **Express.js**
- **TypeScript**
- **Prisma ORM** with **SQLite**
- ESLint & Prettier for code quality

### Frontend
- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- Vanilla CSS with custom design system

## 📁 Project Structure

```
quiz-builder/
├── backend/                 # Express.js API server
│   ├── src/
│   │   ├── index.ts        # Server entry point
│   │   ├── prisma.ts       # Prisma client
│   │   ├── types.ts        # TypeScript types
│   │   └── routes/
│   │       └── quizzes.ts  # Quiz API routes
│   └── prisma/
│       ├── schema.prisma   # Database schema
│       └── seed.ts         # Seed data script
├── frontend/               # Next.js application
│   └── src/
│       ├── app/           # App router pages
│       │   ├── page.tsx           # Home page
│       │   ├── create/page.tsx    # Quiz creation
│       │   ├── quizzes/page.tsx   # Quiz list
│       │   └── quizzes/[id]/      # Quiz detail
│       ├── components/    # React components
│       ├── services/      # API client
│       └── types/         # TypeScript types
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```
   
   Configure the database URL (default is SQLite):
   ```env
   DATABASE_URL="file:./dev.db"
   PORT=3001
   ```

4. Initialize the database:
   ```bash
   npm run db:push
   npm run db:generate
   ```

5. (Optional) Seed sample data:
   ```bash
   npm run db:seed
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

   The API will be available at `http://localhost:3001`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000`

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/quizzes` | Create a new quiz |
| `GET` | `/quizzes` | Get all quizzes (with question count) |
| `GET` | `/quizzes/:id` | Get quiz details with all questions |
| `DELETE` | `/quizzes/:id` | Delete a quiz |

### Example: Create a Quiz

```bash
curl -X POST http://localhost:3001/quizzes \
  -H "Content-Type: application/json" \
  -d '{
    "title": "JavaScript Basics",
    "questions": [
      {
        "text": "JavaScript is a compiled language",
        "type": "boolean",
        "order": 0,
        "options": [
          { "text": "True", "isCorrect": false },
          { "text": "False", "isCorrect": true }
        ]
      }
    ]
  }'
```

## 🎨 Design System

The application uses a custom CSS design system with:

- **Color Palette**: Deep purple primary with teal accents
- **Typography**: Inter font family
- **Components**: Cards, buttons, inputs, badges
- **Animations**: Smooth transitions and micro-interactions
- **Dark Theme**: Premium dark mode aesthetic

## 📝 Sample Quiz

After running the seed script, you'll have two sample quizzes:

1. **JavaScript Fundamentals**
   - True/False, Text Input, and Multiple Choice questions
   - Covers basic JavaScript concepts

2. **React Essentials**
   - Questions about React hooks and concepts
   - Multiple question types

## 🧪 Development

### Backend Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run db:push      # Push schema to database
npm run db:generate  # Generate Prisma client
npm run db:seed      # Seed sample data
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

### Frontend Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 📄 License

This project is licensed under the ISC License.
