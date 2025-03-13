# Frontend Documentation

## 🏗️ Frontend Architecture

The frontend is built with React 19, TypeScript 5.8.2, and Inertia.js v2, providing a modern single-page application experience while maintaining the benefits of server-side rendering. It uses Vite 6.2.0 as the bundler and includes Tailwind CSS 4, Shadcn UI, and Lucide React 0.473.0 for the UI components.

### Directory Structure

```
resources/js/
├── components/     # Reusable UI components
│   └── ui/        # Shadcn UI components
├── layouts/        # Page layouts
├── Pages/         # Page components
├── types/         # TypeScript definitions
├── hooks/         # Custom React hooks
├── lib/           # Library code and utilities
└── utils/         # Utility functions
```

## 🎨 UI Components

### Shadcn UI Integration

We use Shadcn UI for consistent, accessible components with the following configuration:

- Style: default
- Base color: neutral
- CSS variables mode enabled
- TypeScript and React strict mode enabled
- Lucide React icons integration

Components are installed using the CLI:

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

## 🎨 Styling with Tailwind 4

### Configuration

Tailwind 4 is configured with a modern CSS variables approach and full dark mode support. The configuration is defined in `resources/css/app.css`:

```css
@import 'tailwindcss';
@plugin '@tailwindcss/forms';
@plugin 'tailwindcss-animate';

@theme {
  --font-sans: Figtree, ui-sans-serif, system-ui, /* ... */;
  --radius-lg: var(--radius);
  --radius-md: calc(var(--radius) - 2px);
  --radius-sm: calc(var(--radius) - 4px);
}
```

### Theme System

The theme system uses CSS variables for colors, with both light and dark mode support:

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 3.9%;
    --primary: 0 0% 9%;
    --primary-foreground: 0 0% 98%;
    /* ... other color variables */
  }

  .dark {
    --background: 0 0% 3.9%;
    --foreground: 0 0% 98%;
    --card: 0 0% 3.9%;
    --card-foreground: 0 0% 98%;
    /* ... dark mode color variables */
  }
}
```

### CSS Organization

```
resources/css/
├── app.css        # Main CSS file with theme configuration
└── components/    # Component-specific styles
```

### Key Features

1. **Modern CSS Variables**: Uses CSS custom properties for dynamic theming
2. **Dark Mode**: Built-in `.dark` class variant
3. **Semantic Colors**: HSL-based color system for consistent theming
4. **Component Tokens**: Dedicated variables for specific UI components
5. **Animation Support**: Built-in animation utilities via `tailwindcss-animate`

### Styling Best Practices

1. Use semantic color variables (e.g., `bg-background`, `text-foreground`)
2. Leverage the new border color system with `border-border`
3. Use radius variables for consistent component shapes
4. Apply dark mode utilities with the `.dark` class variant
5. Utilize Shadcn UI's built-in styling system

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
