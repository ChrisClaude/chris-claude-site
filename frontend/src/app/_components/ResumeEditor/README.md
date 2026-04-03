# Resume Editor

A comprehensive resume editor built with React, TypeScript, and HeroUI that allows users to create, edit, and export resume data in JSON format.

## Features

- **Complete Resume Management**: Edit all sections of a resume including personal information, work experience, education, skills, projects, languages, social links, and references
- **Form Validation**: Comprehensive validation with real-time error feedback
- **JSON Import/Export**: Import existing resume data or export your edited resume as JSON
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Type Safety**: Full TypeScript support with comprehensive interfaces
- **Modern UI**: Built with HeroUI components for a polished user experience

## Components

### Core Components

- **ResumeEditor**: Main component that orchestrates the entire editor experience
- **PersonalInfoForm**: Form for editing personal information (name, title, contact details, etc.)
- **WorkExperienceForm**: Dynamic form for adding/editing work experience entries
- **EducationForm**: Form for managing educational background
- **StringArrayForm**: Reusable component for managing arrays of strings (technologies, skills)
- **ReferencesForm**: Form for managing professional references
- **SocialLinksForm**: Form for managing social media and professional links
- **LanguagesForm**: Form for managing language skills with proficiency ratings
- **NotableProjectsForm**: Form for showcasing notable projects

### Hooks and Utilities

- **useResumeForm**: Custom hook for managing form state and business logic
- **validation.ts**: Comprehensive validation utilities for all form sections

## Usage

### Basic Usage

```tsx
import ResumeEditor from './components/ResumeEditor/ResumeEditor';
import resumeData from './data/resumeData.json';

function App() {
  return <ResumeEditor initialData={resumeData} />;
}
```

### Form Validation

The editor includes comprehensive validation for:

- **Personal Information**: Required fields, email format, phone format, URL validation
- **Work Experience**: All required fields, responsibility validation
- **Education**: Required fields, URL validation for institution links
- **References**: Required fields, email format validation
- **Social Links**: URL validation, required fields
- **Languages**: Proficiency rating validation (1-5 scale)
- **Projects**: Required fields, optional URL validation

### JSON Export/Import

- **Export**: Click "Export JSON" to download your resume data as a JSON file
- **Import**: Click "Import JSON" to load existing resume data from a JSON file
- **Validation**: The export function validates data before allowing download

## Data Structure

The resume data follows this TypeScript interface:

```typescript
interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  workExperience: WorkExperience[];
  references: Reference[];
  technologies: string[];
  skills: string[];
  education: Education[];
  languages: Language[];
  notableProjects: NotableProject[];
  socialLinks: SocialLink[];
}
```

## Styling

The editor uses HeroUI components with a consistent design system:

- **Cards**: Used for section containers
- **Tabs**: Organize different resume sections
- **Forms**: Input fields, textareas, selects, and buttons
- **Modals**: Success messages and confirmations
- **Progress**: Validation progress indicator

## Error Handling

- **Real-time Validation**: Errors are shown as users type
- **Section-specific Errors**: Each form section shows its own validation errors
- **Export Validation**: Data is validated before export to ensure completeness
- **User Feedback**: Clear error messages and success confirmations

## Accessibility

- **Keyboard Navigation**: Full keyboard support for all form elements
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Focus Management**: Clear focus indicators and logical tab order
- **Error Announcements**: Screen reader announcements for validation errors

## Browser Support

- Modern browsers with ES6+ support
- Mobile responsive design
- Touch-friendly interface for mobile devices

## Development

### Adding New Sections

1. Create a new form component following the existing pattern
2. Add the section to the ResumeData interface
3. Update the validation utilities
4. Add the new tab to the ResumeEditor component
5. Update the useResumeForm hook if needed

### Customizing Validation

Edit the validation utilities in `utils/validation.ts` to modify validation rules for any section.

### Styling Customization

The editor uses HeroUI's theming system. Customize the appearance by modifying the theme configuration.
