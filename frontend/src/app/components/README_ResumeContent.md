# ResumeContent Component

The `ResumeContent` component has been refactored to be reusable with different JSON data while maintaining the same layout and styling.

## Features

- **Reusable**: Accepts JSON data as props to display different resumes
- **Backward Compatible**: Works without props (uses default data)
- **TypeScript Support**: Fully typed with interfaces for all data structures
- **Flexible**: Supports dynamic content for all resume sections

## Usage

### Basic Usage (with JSON data)

```tsx
import ResumeContent from './ResumeContent';
import resumeData from '../data/resumeData.json';

const MyResumePage = () => {
  return <ResumeContent data={resumeData} />;
};
```

### Usage without data (uses default)

```tsx
import ResumeContent from './ResumeContent';

const MyResumePage = () => {
  return <ResumeContent />;
};
```

## JSON Data Structure

The component expects a JSON object with the following structure:

```json
{
  "personalInfo": {
    "name": "Full Name",
    "title": "Job Title",
    "phone": "Phone Number",
    "email": "Email Address",
    "website": "Website URL",
    "location": "Location",
    "image": "/path/to/image.png",
    "imageAlt": "Image Alt Text"
  },
  "summary": "Professional summary text...",
  "workExperience": [
    {
      "title": "Job Title",
      "company": "Company Name",
      "startDate": "MM/YYYY",
      "endDate": "MM/YYYY or Present",
      "location": "Location",
      "description": "Job description...",
      "responsibilities": [
        "Responsibility 1",
        "Responsibility 2"
      ]
    }
  ],
  "references": [
    {
      "fullName": "Reference Name",
      "role": "Reference Role",
      "email": "reference@email.com",
      "company": "Company Name"
    }
  ],
  "technologies": ["Tech 1", "Tech 2", "Tech 3"],
  "skills": ["Skill 1", "Skill 2", "Skill 3"],
  "education": [
    {
      "degree": "Degree Name",
      "institution": "Institution Name",
      "institutionUrl": "https://institution-url.com",
      "startDate": "MM/YYYY",
      "endDate": "MM/YYYY",
      "location": "Location"
    }
  ],
  "languages": [
    {
      "name": "Language Name",
      "level": "Proficiency Level",
      "proficiency": 5
    }
  ],
  "notableProjects": [
    {
      "title": "Project Title",
      "url": "https://project-url.com",
      "description": "Project description..."
    }
  ],
  "socialLinks": [
    {
      "platform": "Platform Name",
      "icon": "IconComponentName",
      "url": "https://social-url.com",
      "displayText": "Display Text"
    }
  ]
}
```

## Supported Icons for Social Links

The following icons are supported in the `socialLinks.icon` field:

- `GiEarthAfricaEurope` - For website links
- `FaLinkedinIn` - For LinkedIn
- `FaGithub` - For GitHub
- `SiLeetcode` - For LeetCode

## Language Proficiency

The `languages.proficiency` field accepts values from 1-5, where:
- 1 = Beginner
- 2 = Elementary
- 3 = Intermediate
- 4 = Advanced
- 5 = Native/Fluent

## Example

See `ResumeContentExample.tsx` for a complete example of how to use the component with JSON data.

## Benefits

1. **Reusability**: Create multiple resumes with different data
2. **Maintainability**: Easy to update content without touching component code
3. **Consistency**: All resumes maintain the same professional layout
4. **Flexibility**: Add or remove sections by modifying the JSON structure
5. **Type Safety**: Full TypeScript support prevents data structure errors
