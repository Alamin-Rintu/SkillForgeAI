# 🚀 SkillForge AI — AI-Powered Tech Career & Roadmap Platform

[![Live Application](https://img.shields.io/badge/Live%20Demo-Vercel-blue?style=for-the-badge&logo=vercel)](https://skill-forge-ai-ivory-gamma.vercel.app/)

**🌐 Live Website**: [https://skill-forge-ai-ivory-gamma.vercel.app/](https://skill-forge-ai-ivory-gamma.vercel.app/)

SkillForge AI is a modern, production-ready full-stack SaaS web application designed to empower students, software engineers, and job seekers. It features personalized AI learning roadmaps, instant ATS resume scoring, AI career recommendations, and interactive conversational interview practice powered by the **Google Gemini API**.

---

## 🌟 Key Features

- 🎯 **AI Learning Roadmap Generator**: Input your target job role, skill level, and weekly available hours to generate multi-week learning schedules, curated documentation, and portfolio capstone project briefs.
- 📄 **AI Resume Analyzer & ATS Audit**: Paste or upload your resume (TXT/PDF text) to receive an instant ATS compatibility score, strengths & weaknesses breakdown, missing target keywords, and downloadable PDF/TXT reports.
- 🧩 **AI Career Recommendation Engine**: Evaluates your technical skill matrix to recommend high-match tech job titles, top industry certification programs, and portfolio projects.
- 🤖 **AI Interview Assistant**: Conversational mock interview coach available as both a dedicated suite and a **sticky site-wide floating widget**. Features topic selection, typing indicators, sample prompt pills, and follow-up questions.
- 🗺️ **Roadmap Explorer**: Real-time search, skill level & category filters, sorting (newest, popular, top rated), pagination, equal-height interactive cards, and shimmer loading skeletons.
- 📊 **Platform & Admin Analytics**: Real-time metrics powered by **Recharts** (Area, Bar, Line, and Pie charts) tracking active learners, roadmap completions, and category distribution.
- 🎨 **Modern SaaS Glassmorphism UI**: Built with Tailwind CSS v4, custom primary gradients (`#2563EB`, `#7C3AED`, `#06B6D4`), 16px rounded cards, smooth micro-interactions, and dark/light mode toggle.

---

## 🛠️ Technology Stack

### Frontend (`skillfrogeai`)
- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript
- **Styling & UI**: Tailwind CSS v4, `@heroui/react` & `@heroui/styles`, Glassmorphism tokens
- **Icons**: Lucide React
- **State & Data Fetching**: TanStack Query (`@tanstack/react-query`)
- **Charts & Motion**: Recharts, Canvas Confetti
- **Authentication**: Better Auth Client SDK (`better-auth/react`) + Custom JWT Auth Context

### Backend (`skillfrogeai-server`)
- **Runtime & Server**: Node.js + Express 5 + TypeScript (`tsx` watch mode)
- **Database**: MongoDB (Mongoose + Native `MongoClient` driver)
- **Authentication**: Better Auth (`better-auth`) with MongoDB Adapter + JWT Auth
- **AI Provider**: Google Gemini API (`@google/genai` with `gemini-2.5-flash`)

---

## 📁 Repository Structure

```text
├── skillfrogeai/                   # Next.js 16 Frontend Client
│   ├── src/
│   │   ├── app/                    # App Router Pages (Home, Explore, Detail, AI Tools, Dashboard, Auth)
│   │   ├── components/             # Reusable UI (Navbar, Footer, RoadmapCard, FloatingAIChat, StatCard)
│   │   ├── context/                # AuthContext & ThemeContext
│   │   ├── lib/                    # API client fetcher & Better Auth client SDK
│   │   └── globals.css             # Glassmorphism utilities & theme tokens
│   ├── .env                        # Frontend environment variables
│   └── package.json
│
└── skillfrogeai-server/            # Express 5 Backend Server
    ├── src/
    │   ├── config/                 # Mongoose (db.ts) & Native MongoClient (mongo.ts)
    │   ├── models/                 # Mongoose Schemas (User, Roadmap, Blog, Review, AIChat, etc.)
    │   ├── controllers/            # Gemini AI handlers, Auth, Roadmaps, Analytics
    │   ├── routes/                 # Express API routes
    │   ├── middleware/             # JWT & auth middleware
    │   ├── lib/                    # Better Auth server configuration
    │   └── seed/                   # MongoDB initial data seeder
    ├── index.ts                    # Express server entry point
    ├── .env                        # Backend environment variables
    └── package.json
```

---

## ⚙️ Environment Configuration

### Client Environment Variables (`skillfrogeai/.env`)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SERVER_URL=http://localhost:5000
BETTER_AUTH_URL=http://localhost:3000
```

### Server Environment Variables (`skillfrogeai-server/.env`)
```env
PORT=5000
MONGODB_URI=mongodb+srv://SkillFrogeAI:<password>@cluster0.gizlskc.mongodb.net/SkillForgeAI?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=skillforge_secret_key_2026
BETTER_AUTH_SECRET=5WZTiVmqqhmKnxZw0Uhhq4vlQ705LQ3x
BETTER_AUTH_URL=http://localhost:3000
GEMINI_API_KEY=your_gemini_api_key_here
```

---

## 🚦 Quick Start (Local Setup)

### 1. Start Backend Server
```bash
cd skillfrogeai-server
npm install
npm run dev
```
*Server runs at: `http://localhost:5000`*

### 2. Start Frontend Client
```bash
cd skillfrogeai
npm install
npm run dev
```
*Client runs at: `http://localhost:3000`*

---

## 🔌 Primary API Reference (`http://localhost:5000`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | API status health check |
| `GET` | `/api/roadmaps` | List roadmaps with search, filters, and pagination |
| `GET` | `/api/roadmaps/:id` | Get roadmap details and student reviews |
| `POST` | `/api/roadmaps` | Create new roadmap |
| `POST` | `/api/ai/roadmap-generator` | Generate Gemini AI personalized learning schedule |
| `POST` | `/api/ai/resume-analyzer` | Gemini AI resume ATS scoring & improvement report |
| `POST` | `/api/ai/career-advisor` | Gemini AI career path & certificate recommendations |
| `POST` | `/api/ai/interview-coach` | Gemini AI conversational interview session |
| `GET` | `/api/analytics` | Recharts platform analytics and user counts |
| `ALL` | `/api/auth/*` | Better Auth authentication endpoints |

---

## 📄 License
This project is open source and available under the [ISC License](LICENSE).
