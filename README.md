# React Inertia Laravel - Project Starter

A modern, full-stack web application boilerplate built with Laravel 12.x, Inertia.js v2, React 19, TypeScript 5.8.2, Tailwind CSS 4, and Shadcn UI components.

![Starter Screenshots](https://github.com/user-attachments/assets/a550c79c-87eb-49a2-996b-8bb86991ec99)

## Features

- Auth features using Laravel Fortify
    - Login, registration, password reset, email verification, and two-factor authentication
- Server-side rendering and initial page load performance
- Hot Module Replacement (HMR) and fast refresh during development
- TypeScript/React code quality with ESLint and Prettier
- Modern UI powered by Tailwind CSS and Shadcn components

## Architecture Overview

This project implements a modern monolithic architecture using Laravel as the backend framework and React for the frontend, seamlessly connected via Inertia.js. This architecture provides:

- **Single Codebase**: All code lives in one repository, simplifying deployment and maintenance
- **Server-Side Rendering**: Improved SEO and initial page load performance
- **Type Safety**: Full TypeScript support across the frontend
- **Modern UI**: Powered by Tailwind CSS and Shadcn components
- **Authentication**: Built-in auth system using Laravel Fortify
- **Developer Experience**: Hot Module Replacement (HMR) and fast refresh during development

### Tech Stack

- **Backend**

    - Laravel 12.x (PHP 8.4)
    - Laravel Fortify 1.25 for Auth features
    - Laravel Sanctum 4.0 for API tokens
    - Ziggy 2.0 for route handling
    - SQLite

- **Frontend**

    - React ^19
    - TypeScript ^5
    - Vite ^6
    - Tailwind CSS ^4
    - Shadcn UI Components
    - Lucide React Icons

- **Frontend-Backend communication**
    - Inertia.js for seamless frontend-backend communication

## Getting Started

### Prerequisites

- PHP 8.4
- Composer
- Node.js (Latest LTS version)
- SQLite (but you can use any other RDBMS)
- Laravel Herd (to run the application)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/ferjal0/react-inertia-laravel
cd react-inertia-laravel
```

2. Install PHP dependencies:

```bash
composer install
```

3. Install Node.js dependencies:

```bash
pnpm install
```

4. Set up your environment:

```bash
cp .env.example .env
php artisan key:generate
```

5. Configure your database in `.env` and run migrations with seeding:

```bash
php artisan migrate --seed
```

This will create the database tables and an initial user account that you can use to access the dashboard.

6. Start the development servers:

```bash
pnpm run dev
```

Visit `http://react-inertia-laravel.test` to see your application.

## Documentation Structure

The documentation is split into three main sections:

1. [Getting Started](docs/getting-started.md) - This file, containing project overview and setup instructions
2. [Backend Documentation](docs/backend.md) - Details about Laravel implementation, API endpoints, and authentication
3. [Frontend Documentation](docs/frontend.md) - React components, Inertia.js integration, and UI architecture

## Code Style

- PHP code follows PSR-12 standards
- TypeScript/React code follows the project's ESLint and Prettier configuration
- Run style checks with:

```bash
# PHP
./vendor/bin/pint

# TypeScript/React
pnpm run lint
```

## Building for Production

```bash
pnpm run build
```
