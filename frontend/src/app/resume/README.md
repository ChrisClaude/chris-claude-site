# Resume Module

A comprehensive resume management system with viewing, editing, and browsing capabilities.

## Overview

The Resume Module provides a complete solution for managing and displaying resumes across multiple languages and formats. It includes a home page, resume viewer, and resume editor.

## Structure

```
resume/
├── page.tsx              # Resume Hub home page
├── layout.tsx            # Resume module layout with navigation header
├── view/                 # Resume viewer feature
│   ├── page.tsx
│   └── README.md
├── editor/               # Resume editor feature
│   └── page.tsx
└── README.md            # This file
```

## Features

### Resume Hub (Home Page)
- Central navigation hub for all resume features
- Feature cards for Resume Viewer and Editor
- Getting started guide
- Responsive design with engaging UI

### Resume Viewer
- Browse and search all available resumes
- Filter by language (English/French) and person
- View detailed resume content
- Download and share functionality
- URL-based direct access to specific resumes

### Resume Editor
- Visual editing interface
- Real-time preview
- Section management
- Multiple export formats

## Navigation

The module includes a sticky header with navigation links:
- **Home**: Return to Resume Hub
- **View Resumes**: Browse resume gallery
- **Editor**: Create/edit resumes

---

## Code Quality Guidelines

### General Principles

#### Clean Code
- Write **clean, modular, and maintainable code**
- Follow **SOLID principles** and ensure the logic is testable
- Apply the **DRY principle**—reuse helper functions/utilities where possible
- Use **meaningful variable, function, and component names**
- Add inline comments for any non-obvious logic

#### Error Handling
- Handle errors gracefully and provide clear user feedback
- Use try-catch blocks for async operations
- Display user-friendly error messages
- Log errors appropriately for debugging

### React & TypeScript

#### Components
- Use **functional components with hooks**, not class components
- Avoid overly large React components—**split long components into smaller subcomponents** within different files for readability and maintainability
- Keep each component focused on a single responsibility
- Use component composition with custom hooks to separate UI code from business logic code

**Example Structure:**
```typescript
// ❌ Bad: Large component with mixed concerns
const ResumeList = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);
  // ... 200+ lines of logic and UI
};

// ✅ Good: Separated concerns
const useResumeList = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);
  // ... business logic
  return { resumes, loading, /* ... */ };
};

const ResumeList = () => {
  const { resumes, loading } = useResumeList();
  // ... UI rendering only
};
```

#### Type Safety
- Ensure **full TypeScript support** with comprehensive interfaces/types
- Define interfaces for all props, state, and data structures
- Use type inference where appropriate but be explicit when it improves clarity
- Avoid `any` type—use `unknown` or proper types instead

**Example:**
```typescript
// ✅ Good: Comprehensive type definitions
interface ResumeListProps {
  onResumeSelect: (resume: ResumeListItem) => void;
  selectedResumeId?: string;
}

interface ResumeListItem {
  id: string;
  personName: string;
  title: string;
  language: 'en' | 'fr';
  fileName: string;
  description?: string;
  folder: string;
  data: ResumeData;
}
```

### Component Composition with Hooks

Use custom hooks to separate business logic from presentation logic. This pattern improves:
- **Testability**: Business logic can be tested independently
- **Reusability**: Hooks can be shared across components
- **Readability**: Components focus on UI, hooks focus on logic
- **Maintainability**: Changes to logic don't require UI changes

**Pattern:**
```typescript
// Custom hook: Business logic
const useFeature = () => {
  const [state, setState] = useState();

  const handleAction = () => {
    // Business logic here
  };

  return { state, handleAction };
};

// Component: UI rendering
const FeatureComponent = () => {
  const { state, handleAction } = useFeature();

  return (
    <div>
      {/* UI rendering only */}
    </div>
  );
};
```

**Reference:** [React Design Patterns - Component Composition with Hooks](https://refine.dev/blog/react-design-patterns/#component-composition-with-hooks)

### UI/UX

#### Consistency
- Keep the UI consistent with **HeroUI** components
- Follow the established design system and color palette
- Use consistent spacing, typography, and layout patterns
- Maintain consistent naming conventions for CSS classes

#### Accessibility
- Provide proper ARIA labels for interactive elements
- Ensure keyboard navigation works correctly
- Use semantic HTML elements
- Include loading states and error states with clear messaging

#### Responsive Design
- Design mobile-first with responsive breakpoints
- Test on multiple screen sizes
- Hide/show elements appropriately on different devices
- Ensure touch targets are appropriately sized for mobile

### Security

#### Data Protection
- Secure credential storage and API communication
- Never commit sensitive data (API keys, credentials) to version control
- Use environment variables for configuration
- Validate and sanitize all user inputs

#### Best Practices
- Implement proper authentication and authorization
- Use HTTPS for all API communications
- Follow OWASP security guidelines
- Regular security audits and dependency updates

### File Organization

#### Component Structure
```
ComponentName/
├── ComponentName.tsx       # Main component
├── ComponentName.types.ts  # TypeScript interfaces
├── ComponentName.hooks.ts  # Custom hooks (business logic)
├── ComponentName.utils.ts  # Utility functions
└── index.ts               # Barrel export
```

#### Naming Conventions
- **Components**: PascalCase (e.g., `ResumeList.tsx`)
- **Hooks**: camelCase with "use" prefix (e.g., `useResumeViewer.ts`)
- **Utils**: camelCase (e.g., `resumeLoader.ts`)
- **Types**: PascalCase with descriptive names (e.g., `ResumeListItem`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_RESULTS`)

### Testing

#### Unit Tests
- Write tests for custom hooks and utility functions
- Test edge cases and error conditions
- Aim for high code coverage on critical paths
- Use descriptive test names

#### Component Tests
- Test component rendering with different props
- Test user interactions and event handlers
- Test loading and error states
- Use React Testing Library best practices

### Performance

#### Optimization
- Use `useMemo` and `useCallback` for expensive computations
- Implement proper list virtualization for long lists
- Lazy load images and components where appropriate
- Minimize bundle size with code splitting

#### Best Practices
- Avoid unnecessary re-renders
- Profile components with React DevTools
- Optimize images and assets
- Use proper caching strategies

## Getting Started

### Development
1. Navigate to `/resume` to see the Resume Hub
2. Explore different features through the navigation
3. Follow the code quality guidelines when contributing

### Adding New Features
1. Create feature directory under `/resume`
2. Follow the component structure guidelines
3. Separate business logic into custom hooks
4. Add comprehensive TypeScript types
5. Write tests for new functionality
6. Update this README with feature documentation

## Related Documentation

- [Resume View Page Documentation](./view/README.md)
- [React Design Patterns](https://refine.dev/blog/react-design-patterns/#component-composition-with-hooks)
- [HeroUI Documentation](https://heroui.com)
- [Next.js App Router](https://nextjs.org/docs/app)

## Contributing

When contributing to this module:
1. Follow all code quality guidelines above
2. Write comprehensive TypeScript types
3. Separate UI from business logic using custom hooks
4. Add tests for new functionality
5. Update documentation
6. Ensure responsive design works on all screen sizes
7. Test accessibility features

## Support

For questions or issues related to the Resume Module, please refer to the documentation or reach out to the development team.
