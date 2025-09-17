# Resume View Page

This page provides a comprehensive resume viewing experience with the following features:

## Features

### Resume Gallery
- **List View**: Displays all available resumes in a responsive grid layout
- **Search**: Search resumes by name, title, or description
- **Filtering**: Filter by language (English/French) and person
- **Metadata Display**: Shows resume metadata including person name, title, language, and description

### Resume Viewer
- **Full Resume Display**: Uses the existing `ResumeContent` component to display the complete resume
- **Navigation**: Easy back navigation to the resume list
- **Download**: Direct PDF download functionality
- **Share**: Copy resume URL to clipboard for sharing

### URL Support
- **Direct Access**: Access specific resumes via URL parameters (`/resume/view?resume=resumeId`)
- **Browser History**: Proper browser history management with URL updates

## Components

### `ResumeViewPage`
Main page component that orchestrates the entire experience.

### `ResumeList`
Displays the gallery of available resumes with search and filtering capabilities.

### `ResumeViewer`
Shows the selected resume with navigation and action buttons.

### `useResumeViewer`
Custom hook managing state, URL parameters, and navigation logic.

## Data Management

### `resumeLoader.ts`
Utility module that:
- Imports all JSON resume files
- Provides metadata for each resume
- Offers search and filtering functions
- Maintains type safety with TypeScript interfaces

## Usage

1. Navigate to `/resume/view` to see the resume gallery
2. Use search and filters to find specific resumes
3. Click on any resume card to view the full resume
4. Use the back button to return to the gallery
5. Share or download resumes as needed

## Technical Implementation

- **Component Composition**: Uses custom hooks to separate business logic from UI
- **Type Safety**: Full TypeScript support with comprehensive interfaces
- **Error Handling**: Graceful error handling with user-friendly messages
- **Loading States**: Proper loading indicators during data operations
- **Responsive Design**: Mobile-first responsive design using Tailwind CSS
- **Accessibility**: Proper ARIA labels and keyboard navigation support
