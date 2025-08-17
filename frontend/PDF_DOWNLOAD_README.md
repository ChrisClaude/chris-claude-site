# PDF Download Functionality

This document describes the PDF download functionality implemented for all resume pages.

## Features

- **Automatic PDF Generation**: All resume pages now support PDF download functionality
- **URL Parameter Trigger**: Add `?download=true` to any resume URL to automatically download the PDF
- **Download Button**: Each resume page has a "Download PDF" button for easy access
- **Optimized PDF Layout**: PDFs are optimized for A4 paper size with professional formatting
- **Multi-page Support**: Long resumes automatically span multiple pages
- **High Quality**: PDFs are generated with high resolution (2x scale) for crisp text and images

## How to Use

### Method 1: Download Button
1. Navigate to any resume page
2. Click the "Download PDF" button in the top-right corner
3. The PDF will be automatically generated and downloaded

### Method 2: URL Parameter
1. Navigate to any resume page
2. Add `?download=true` to the URL
3. The PDF will be automatically generated and downloaded
4. The page will redirect back to the normal view after download

## Supported Resume Pages

All resume pages support PDF download:

- `/resume` - Main resume
- `/resume/french` - French version of main resume
- `/resume/florica` - Florica's resume
- `/resume/feisca` - Feisca's main resume
- `/resume/feisca/french` - Feisca's French resume
- `/resume/feisca/callcenter` - Feisca's call center resume
- `/resume/feisca/callcenter/french` - Feisca's call center French resume
- `/resume/feisca/front-desk-staff` - Feisca's front desk staff resume
- `/resume/feisca/front-desk-staff/french` - Feisca's front desk staff French resume
- `/resume/feisca/socialmedia` - Feisca's social media resume
- `/resume/feisca/socialmedia/french` - Feisca's social media French resume

## Technical Implementation

### Dependencies
- `jspdf`: PDF generation library
- `html2canvas`: HTML to canvas conversion for PDF generation

### Key Components

1. **PDF Generator Utility** (`/utils/pdfGenerator.ts`)
   - `generatePDF()`: Core PDF generation function
   - `downloadResumePDF()`: High-level function for resume PDF generation
   - `createPDFContent()`: Generates optimized HTML content for PDF

2. **PDF-Optimized Component** (`/components/ResumeContentPDF.tsx`)
   - PDF-specific layout and styling
   - Optimized for A4 paper size
   - Professional formatting for print

3. **Updated Resume Pages**
   - All resume pages now include PDF download functionality
   - URL parameter detection for automatic downloads
   - Loading states during PDF generation

### PDF Optimization Features

- **A4 Paper Size**: Optimized for standard A4 (210mm x 297mm)
- **Professional Typography**: Clean, readable fonts and spacing
- **Responsive Layout**: Content adapts to fit page boundaries
- **Multi-page Support**: Long content automatically flows to additional pages
- **High Resolution**: 2x scale rendering for crisp output
- **Image Support**: Profile pictures and other images are included
- **Color Optimization**: Print-friendly colors and contrast

## File Naming Convention

PDFs are automatically named using the person's name:
- Format: `{PersonName}_Resume.pdf`
- Example: `Florica_Tchambila_Resume.pdf`

## Error Handling

- Graceful error handling with user-friendly messages
- Fallback to normal page view if PDF generation fails
- Console logging for debugging purposes

## Browser Compatibility

The PDF download functionality works in all modern browsers that support:
- ES6+ JavaScript features
- Canvas API
- File download API

## Performance Considerations

- PDF generation happens client-side to avoid server load
- Temporary DOM elements are cleaned up after generation
- Images are pre-loaded before PDF generation for better quality
- Loading states provide user feedback during generation
