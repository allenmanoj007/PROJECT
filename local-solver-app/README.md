# Local Community Problem Solver App

A modern, full-stack application built to empower communities by allowing users to report, track, and solve local issues such as Lost & Found items, community complaints, and events.

## Features
- **User Authentication:** Secure JWT-based login/register.
- **Reporting System:** Create detailed issues with category, status, and precise descriptions.
- **Dynamic Feed:** Instagram/Twitter inspired modern UI to view community problems.
- **Upvotes & Comments:** Engage with local issues effectively to bring visibility.
- **Dark/Light Mode:** Responsive layouts optimized for mobile and desktop screens.

## Tech Stack
- MongoDB & Mongoose
- Express.js
- React.js (Vite)
- Node.js
- Tailwind CSS

## Requirements
- Node.js (v18+)
- MongoDB Atlas cluster perfectly configured or local MongoDB instance running.

## Installation & Setup

1. **Clone & Setup Backend**
```bash
cd backend
npm install
npm start
# Server runs on http://localhost:5000
```

2. **Setup .env in backend**
```env
PORT=5000
MONGODB_URI=your_mongodb_cluster_string
JWT_SECRET=your_jwt_secret_key
```

3. **Setup Frontend**
```bash
cd ../frontend
npm install
npm run dev
# Frontend runs on http://localhost:3000
```

## Demo & Future Implementations
- AI-based spam detection.
- Real-time FireBase notifications.
- Complete admin dashboard integration.

*Built to be a startup-ready SaaS structure.*
