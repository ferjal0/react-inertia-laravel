# Frontend Documentation

## 🏗️ Frontend Architecture

The frontend is built with React 18, TypeScript, and Inertia.js, providing a modern single-page application experience while maintaining the benefits of server-side rendering.

### Directory Structure

```
resources/js/
├── components/     # Reusable UI components
├── layouts/        # Page layouts
├── pages/         # Page components
├── types/         # TypeScript definitions
└── utils/         # Utility functions
```

## 🎨 UI Components

### Shadcn UI Integration

We use Shadcn UI for consistent, accessible components. Components are installed using the CLI:

```bash
pnpm dlx shadcn-ui@latest add button
```

Components are stored in `resources/js/components/ui/` and can be customized in `components.json`.

### Custom Components

Custom components follow these conventions:

```typescript
// resources/js/components/MyComponent.tsx
import React from 'react'
import { cn } from '@/lib/utils'

interface MyComponentProps {
  className?: string
  children: React.ReactNode
}

export function MyComponent({ className, children }: MyComponentProps) {
  return (
    <div className={cn('base-styles', className)}>
      {children}
    </div>
  )
}
```

## 🎯 Pages and Routing

### Page Structure

Pages are stored in `resources/js/pages/` and follow the Laravel route structure:

```
pages/
├── Auth/
│   ├── Login.tsx
│   └── Register.tsx
├── Dashboard/
│   └── Index.tsx
└── Welcome.tsx
```

### Inertia Page Component

```typescript
import { Head } from '@inertiajs/react'
import { PageProps } from '@/types'

export default function Dashboard({ auth }: PageProps) {
  return (
    <>
      <Head title="Dashboard" />
      <h1>Welcome {auth.user.name}</h1>
    </>
  )
}
```

## 📐 Layouts

### Layout Structure

Layouts are in `resources/js/layouts/` and provide consistent page structure:

- `AuthenticatedLayout.tsx`: For authenticated pages
- `GuestLayout.tsx`: For public pages
- `AuthenticationLayout.tsx`: For auth-related pages

### Using Layouts

```typescript
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout'

Dashboard.layout = (page: React.ReactNode) => (
  <AuthenticatedLayout>{page}</AuthenticatedLayout>
)
```

## 🎨 Styling with Tailwind

### Configuration

Tailwind is configured in `tailwind.config.js` with custom theme settings:

```javascript
module.exports = {
    content: ['./resources/js/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                // Custom colors
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
    ],
};
```

### CSS Organization

```
resources/css/
├── app.css        # Main CSS file
└── components/    # Component-specific styles
```

### Styling Best Practices

1. Use Tailwind's utility classes
2. Leverage Shadcn UI's built-in styling system

## 🔄 State Management

### Inertia Props

Data from the server is passed as props:

```typescript
interface PageProps {
    auth: {
        user: User;
    };
    errors: Record<string, string>;
    flash: {
        message?: string;
    };
}
```

### Form Handling

Use Inertia's form helpers:

```typescript
import { useForm } from '@inertiajs/react';

export default function UpdateProfile() {
    const form = useForm({
        name: '',
        email: '',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        form.patch('/profile');
    }
}
```

## 📝 TypeScript Integration

### Type Definitions

Common types are stored in `resources/js/types/`:

```typescript
// types/index.d.ts
export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
}

export interface PageProps {
    auth: {
        user: User;
    };
}
```

### Type Safety

- Strict mode enabled in `tsconfig.json`
- ESLint configured for TypeScript
- Props validation with TypeScript interfaces

## 🧪 Testing

### Test Setup

Tests use Jest and Testing Library:

```typescript
import { render, screen } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })
})
```

### Running Tests

```bash
# Run all tests
pnpm run test

# Run with watch mode
pnpm run test:watch

# Run with coverage
pnpm run test:coverage
```

## 🔍 Development Tools

### VS Code Extensions

Recommended extensions:

- ESLint
- Prettier
- Tailwind CSS IntelliSense
