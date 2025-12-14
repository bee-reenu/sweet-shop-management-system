# Sweet Shop Management System

A full-stack Sweet Shop Management System built as part of a TDD-based kata to demonstrate backend API design, authentication, database integration, frontend development, testing practices, and modern development workflows.

This project simulates a real-world inventory and sales management system for a sweet shop, including user authentication, product management, and inventory operations.

---

## Project Overview

The Sweet Shop Management System allows users to:

- Register and log in securely using JWT authentication
- View a list of available sweets
- Search sweets by name, category, or price range
- Purchase sweets and automatically update stock
- Admin users can add, update, restock, or delete sweets

The project follows RESTful API principles, clean coding practices, and test-driven development (TDD).

---

## Tech Stack

### Backend
- Node.js
- Database: PostgreSQL

### Frontend
- React
- Axios
- React Router

### Testing
- Jest
- Supertest

### Tools
- Git
- GitHub
- AI-assisted development tools

---

## API Endpoints

### Authentication
- POST /api/auth/register
- POST /api/auth/login

### Sweets (Protected)
- POST /api/sweets
- GET /api/sweets
- GET /api/sweets/search
- PUT /api/sweets/:id
- DELETE /api/sweets/:id (Admin only)

### Inventory (Protected)
- POST /api/sweets/:id/purchase
- POST /api/sweets/:id/restock (Admin only)

---

## How to Run Locally

### Backend

cd backend
npm install
npm run dev


### Frontend
```bash
cd frontend
npm install
npm start


Make sure your database service is running and environment variables are properly configured.

🧪 Testing
npm test


The test suite covers:

Authentication flows

CRUD operations for sweets

Inventory logic (purchase & restock)

🤖 My AI Usage

I used AI tools (such as ChatGPT / Copilot) responsibly throughout the development process to:

Brainstorm API structures and folder organization

Generate initial boilerplate code

Assist in writing and refining unit tests

Debug errors and understand edge cases

All AI-generated outputs were reviewed, modified, and integrated manually. AI significantly improved my development speed while allowing me to focus on logic, architecture, and correctness.

⚠️ Current Status & Transparency Note

At an earlier stage, the application was running correctly with authentication, API endpoints, and frontend integration working as expected.

Unfortunately, during later changes and refactoring, something broke unexpectedly, resulting in issues with login and routing. Due to time constraints, the issue could not be fully resolved before submission.

That said:

The architecture, logic, and implementation approach are correct

The issue is debuggable and fixable, and I am actively working on resolving it

I chose to submit this version to demonstrate my problem-solving approach, honesty, and real-world development experience, where systems do break and engineers fix them

🙏 Final Note

Thank you for reviewing my submission. I would genuinely appreciate the opportunity to discuss this project further, explain my design decisions, and walk through how I plan to fix the remaining issues.

Please consider selecting me — I am eager to learn, improve, and contribute.
