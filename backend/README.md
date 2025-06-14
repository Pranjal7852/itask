# Task Manager Backend API

A NestJS-based REST API for managing tasks with PostgreSQL database integration.

## Features

- ✅ Full CRUD operations for tasks
- 🤖 AI-powered note generation (simulated)
- 🗄️ PostgreSQL database with TypeORM
- 🔍 Input validation with class-validator
- 🐳 Docker support for easy setup
- 📝 Database migrations and seeding

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- Docker & Docker Compose (optional)

## Quick Start

### Option 1: Using Docker (Recommended)

1. **Clone and setup the project:**
```bash
mkdir task-manager-backend
cd task-manager-backend
# Copy all the artifact files to respective locations
```

2. **Start PostgreSQL with Docker:**
```bash
docker-compose up -d postgres
```

3. **Install dependencies:**
```bash
npm install
```

4. **Setup environment variables:**
```bash
cp .env.example .env
# Edit .env file with your database credentials
```

5. **Run migrations:**
```bash
npm run migration:run
```

6. **Seed the database (optional):**
```bash
npm run seed
```

7. **Start the development server:**
```bash
npm run start:dev
```

### Option 2: Local PostgreSQL

1. **Install PostgreSQL locally**
2. **Create database:**
```sql
CREATE DATABASE task_manager;
```
3. **Follow steps 3-7 from Option 1**

## API Endpoints

Base URL: `http://localhost:3000/api`

### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | Get all tasks |
| GET | `/tasks/:id` | Get task by ID |
| POST | `/tasks` | Create new task |
| PUT | `/tasks/:id` | Update task |
| DELETE | `/tasks/:id` | Delete task |
| POST | `/tasks/:id/generate-note` | Generate AI note for task |

### Sample API Usage

**Create a task:**
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learn NestJS",
    "description": "Study NestJS framework fundamentals",
    "status": "TODO"
  }'
```

**Get all tasks:**
```bash
curl http://localhost:3000/api/tasks
```

**Generate AI note:**
```bash
curl -X POST http://localhost:3000/api/tasks/{task-id}/generate-note
```

## Database Schema

**Task Entity:**
- `id`: UUID (Primary Key)
- `title`: String (max 255 chars)
- `description`: Text
- `status`: Enum (TODO, IN_PROGRESS, DONE)
- `aiNote`: Text (nullable)
- `createdAt`: Timestamp
- `updatedAt`: Timestamp

## Scripts

- `npm run start:dev` - Start development server
- `npm run build` - Build for production
- `npm run start:prod` - Start production server
- `npm run migration:generate` - Generate new migration
- `npm run migration:run` - Run pending migrations
- `npm run seed` - Seed database with sample data
- `npm test` - Run tests

## Database Management

Access Adminer (Database UI) at: `http://localhost:8080`
- System: PostgreSQL
- Server: postgres
- Username: postgres
- Password: password
- Database: task_manager

## Project Structure

```
src/
├── config/
│   └── database.config.ts
├── database/