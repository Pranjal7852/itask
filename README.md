# Task Management Application

A full-stack task management application built with **Angular 20** frontend, **NestJS** backend, and **PostgreSQL** database. The entire application is containerized and can be run with a single Docker Compose command.

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │     Backend     │    │    Database     │
│   Angular 20    │◄──►│    NestJS       │◄──►│   PostgreSQL    │
│   Port: 4200    │    │   Port: 3000    │    │   Port: 5432    │
│   (Nginx)       │    │   (Node.js)     │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Tech Stack

- **Frontend**: Angular 20, Angular Material, NgRx, TypeScript
- **Backend**: NestJS, TypeORM, Node.js, TypeScript
- **Database**: PostgreSQL 15
- **Containerization**: Docker, Docker Compose
- **Web Server**: Nginx (for Angular production build)

## 🚀 Quick Start

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed
- [Docker Compose](https://docs.docker.com/compose/install/) installed
- Git (to clone the repository)

### 1. Clone & Setup Environment

```bash
# Clone the repository
git clone https://github.com/Pranjal7852/itask
cd itask

```

### 2. Configure Environment

Rename the `example.env` file to `.env`. (I have added all the secrets to example.env file for simplicity sake. Not recommended for production or any project). If you still wish to use any other values fell free to do so.

```env
# Database Configuration
POSTGRES_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=

# Backend Configuration
DB_HOST=postgres
DB_PORT=5432
NODE_ENV=production
PORT=3000

# Frontend Configuration
API_URL=http://localhost:3000/api
```

### 3. Run the Application

The entire application has been containerized using docker-compose and I have also added the **migration** and **seeding** script to the DockerFile of the backend so that User does not have to care for it.

```bash
# Build and start all services
docker-compose up --build

# Or run in background (detached mode)
docker-compose up -d --build
```

### 4. Access the Application

- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:3000/api
- **Database**: localhost:5432

## 📦 Container Services

| Service | Technology | Port | Description |
|---------|------------|------|-------------|
| `frontend` | Angular 20 + Nginx | 4200:80 | Web application UI |
| `backend` | NestJS + Node.js | 3000:3000 | REST API server |
| `postgres` | PostgreSQL 15 | 5432:5432 | Database server |

## 🛠️ Development Commands

### Basic Operations

```bash
# Start all services
docker-compose up

# Start in background
docker-compose up -d

# Stop all services
docker-compose down

```

## 🔌 API Endpoints

### Base URL: `http://localhost:3000/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | Get all tasks |
| GET | `/tasks/:id` | Get task by ID |
| POST | `/tasks` | Create new task |
| PUT | `/tasks/:id` | Update task |
| DELETE | `/tasks/:id` | Delete task |
| POST | `/tasks/:id/generate-note` | Generate AI note for task |

### Task Object Structure

```json
{
  "id": "uuid",
  "title": "string",
  "description": "string",
  "status": "TODO | IN_PROGRESS | DONE",
  "aiNote": "string | null",
  "createdAt": "ISO date string",
  "updatedAt": "ISO date string"
}
```

## 🌐 Frontend Features

- **Task Management**: Create, read, update, delete tasks
- **Status Filtering**: Filter tasks by status (All, TODO, IN_PROGRESS, DONE)
- **AI Notes**: Generate AI-powered notes for tasks
- **Responsive Design**: Mobile-friendly Material Design interface
- **Real-time Updates**: Reactive UI with immediate feedback

## 🔧 Backend Features

- **RESTful API**: Clean REST endpoints with proper HTTP status codes
- **Database Integration**: TypeORM with PostgreSQL
- **Validation**: Request validation with class-validator
- **CORS Support**: Configured for frontend integration
- **Logging**: HTTP request logging with Morgan
- **Error Handling**: Comprehensive error handling and responses

## 📂 Project Structure

```
.
├── backend/                 # NestJS Backend Application
│   ├── src/
│   │   ├── tasks/          # Tasks module (controller, service, entity, DTOs)
│   │   ├── config/         # Database configuration
│   │   ├── database/       # Migrations and seeds
│   │   └── main.ts         # Application entry point
│   ├── Dockerfile          # Backend container configuration
│   └── package.json        # Backend dependencies
├── frontend/               # Angular Frontend Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/ # Reusable UI components
│   │   │   ├── services/   # API and business logic services
│   │   │   ├── models/     # TypeScript interfaces
│   │   │   └── app.ts      # Main app component
│   │   └── main.ts         # Angular bootstrap
│   ├── Dockerfile          # Frontend container configuration
│   └── package.json        # Frontend dependencies
├── docker-compose.yml      # Container orchestration
├── env.template           # Environment variables template
└── README.md              # This file
```

## 🔒 Environment Variables

### Required Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `POSTGRES_DB` | Database name | `task_manager` |
| `POSTGRES_USER` | Database user | `postgres` |
| `POSTGRES_PASSWORD` | Database password | `password123` |
| `DB_HOST` | Database host (container name) | `postgres` |
| `API_URL` | Frontend API URL | `http://localhost:3000/api` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Node environment | `production` |
| `PORT` | Backend port | `3000` |



**Happy Coding! 🚀**

Made with ❤️ using Angular, NestJS, and PostgreSQL