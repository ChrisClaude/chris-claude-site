import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePDF = async (
  elementId: string,
  filename: string,
): Promise<void> => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with id "${elementId}" not found`);
    }

    // Configure html2canvas options for better PDF quality
    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: element.scrollWidth,
      height: element.scrollHeight,
      scrollX: 0,
      scrollY: 0,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
      logging: false,
    });

    // Calculate PDF dimensions (A4 size)
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    let position = 0;

    // Add first page
    pdf.addImage(
      canvas.toDataURL('image/png'),
      'PNG',
      0,
      position,
      imgWidth,
      imgHeight,
    );
    heightLeft -= pageHeight;

    // Add additional pages if content is longer than one page
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(
        canvas.toDataURL('image/png'),
        'PNG',
        0,
        position,
        imgWidth,
        imgHeight,
      );
      heightLeft -= pageHeight;
    }

    // Save the PDF
    pdf.save(`${filename}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

// Alternative function that captures the actual rendered resume content
export const downloadResumePDFFromUI = async (
  resumeElementId: string = 'resume-content',
  personName: string,
): Promise<void> => {
  try {
    const resumeElement = document.getElementById(resumeElementId);
    if (!resumeElement) {
      throw new Error(`Resume element with id "${resumeElementId}" not found`);
    }

    // Create a temporary container for PDF generation
    const tempContainer = document.createElement('div');
    tempContainer.id = 'temp-resume-pdf-container';
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '-9999px';
    tempContainer.style.width = '210mm';
    tempContainer.style.backgroundColor = 'white';
    tempContainer.style.padding = '20mm';
    tempContainer.style.fontFamily = 'Arial, sans-serif';
    tempContainer.style.fontSize = '12px';
    tempContainer.style.lineHeight = '1.4';
    tempContainer.style.color = '#1f2937';
    tempContainer.style.pageBreakInside = 'avoid';
    tempContainer.style.breakInside = 'avoid';

    // Clone the resume content
    const clonedContent = resumeElement.cloneNode(true) as HTMLElement;

    // Remove the download button from the cloned content
    const downloadButton = clonedContent.querySelector('button');
    if (downloadButton) {
      downloadButton.remove();
    }

    // Apply PDF-specific styles to the cloned content
    clonedContent.style.width = '100%';
    clonedContent.style.maxWidth = 'none';
    clonedContent.style.margin = '0';
    clonedContent.style.padding = '0';
    clonedContent.style.backgroundColor = 'white';
    clonedContent.style.color = '#1f2937';
    clonedContent.style.fontFamily = 'Arial, sans-serif';
    clonedContent.style.fontSize = '12px';
    clonedContent.style.lineHeight = '1.4';

    // Add PDF-specific CSS class
    clonedContent.classList.add('pdf-container');

    // Add the cloned content to the temporary container
    tempContainer.appendChild(clonedContent);
    document.body.appendChild(tempContainer);

    // Wait for any images to load
    const images = tempContainer.querySelectorAll('img');
    if (images.length > 0) {
      await Promise.all(
        Array.from(images).map(
          img =>
            new Promise(resolve => {
              if (img.complete) {
                resolve(null);
              } else {
                img.onload = () => resolve(null);
                img.onerror = () => resolve(null);
              }
            }),
        ),
      );
    }

    // Generate PDF
    await generatePDF(
      'temp-resume-pdf-container',
      `${personName.replace(/\s+/g, '_')}_Resume`,
    );

    // Clean up
    document.body.removeChild(tempContainer);
  } catch (error) {
    console.error('Error downloading resume PDF from UI:', error);
    throw error;
  }
};

// Improved PDF generation with better page break handling
export const generatePDFWithPageBreaks = async (
  elementId: string,
  filename: string,
): Promise<void> => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with id "${elementId}" not found`);
    }

    // A4 dimensions in mm
    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;
    const contentHeight = pageHeight - margin * 2;

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    let currentPage = 1;
    let currentY = margin;

    // Function to add a new page
    const addNewPage = () => {
      pdf.addPage();
      currentPage++;
      currentY = margin;
    };

    // Function to check if we need a new page
    const checkPageBreak = (elementHeight: number) => {
      if (currentY + elementHeight > pageHeight - margin) {
        addNewPage();
        return true;
      }
      return false;
    };

    // Get all sections that should not be broken
    const sections = element.querySelectorAll(
      '.section, .job-item, .education-item',
    );

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i] as HTMLElement;

      // Configure html2canvas for this section
      const canvas = await html2canvas(section, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: section.scrollWidth,
        height: section.scrollHeight,
        scrollX: 0,
        scrollY: 0,
        logging: false,
      });

      // Calculate dimensions
      const imgWidth = contentWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Check if we need a new page
      checkPageBreak(imgHeight);

      // Add the section to the PDF
      pdf.addImage(
        canvas.toDataURL('image/png'),
        'PNG',
        margin,
        currentY,
        imgWidth,
        imgHeight,
      );

      currentY += imgHeight + 10; // Add some spacing between sections
    }

    // Save the PDF
    pdf.save(`${filename}.pdf`);
  } catch (error) {
    console.error('Error generating PDF with page breaks:', error);
    throw error;
  }
};

export const downloadResumePDF = async (
  resumeData: any,
  personName: string,
): Promise<void> => {
  try {
    // Create a temporary container for the PDF content
    const tempContainer = document.createElement('div');
    tempContainer.id = 'temp-resume-pdf-container';
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '-9999px';
    tempContainer.style.width = '210mm';
    tempContainer.style.backgroundColor = 'white';
    tempContainer.style.padding = '20mm';
    tempContainer.style.fontFamily = 'Arial, sans-serif';
    tempContainer.style.fontSize = '12px';
    tempContainer.style.lineHeight = '1.4';
    tempContainer.style.color = '#1f2937';
    tempContainer.style.pageBreakInside = 'avoid';
    tempContainer.style.breakInside = 'avoid';

    // Add the container to the DOM temporarily
    document.body.appendChild(tempContainer);

    // Create the PDF content as HTML with proper styling
    const pdfContent = createPDFContent(resumeData);
    tempContainer.innerHTML = pdfContent;

    // Wait for any images to load
    const images = tempContainer.querySelectorAll('img');
    if (images.length > 0) {
      await Promise.all(
        Array.from(images).map(
          img =>
            new Promise(resolve => {
              if (img.complete) {
                resolve(null);
              } else {
                img.onload = () => resolve(null);
                img.onerror = () => resolve(null);
              }
            }),
        ),
      );
    }

    // Generate PDF
    await generatePDF(
      'temp-resume-pdf-container',
      `${personName.replace(/\s+/g, '_')}_Resume`,
    );

    // Clean up
    document.body.removeChild(tempContainer);
  } catch (error) {
    console.error('Error downloading resume PDF:', error);
    throw error;
  }
};

const createPDFContent = (resumeData: any): string => {
  const formatDate = (date: string) => {
    if (!date || date === 'Present') return date;
    return date;
  };

  return `
    <style>
      @page {
        size: A4;
        margin: 20mm;
      }
      .page-break {
        page-break-before: always;
      }
      .avoid-break {
        page-break-inside: avoid;
        break-inside: avoid;
      }
      .resume-container {
        font-family: Arial, sans-serif;
        font-size: 12px;
        line-height: 1.4;
        color: #1f2937;
        max-width: 100%;
      }
      .header {
        border-bottom: 2px solid #d1d5db;
        padding-bottom: 20px;
        margin-bottom: 30px;
        page-break-after: avoid;
      }
      .header-content {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }
      .header-left {
        flex: 1;
      }
      .name {
        font-size: 24px;
        font-weight: bold;
        margin: 0 0 8px 0;
        text-transform: uppercase;
      }
      .title {
        font-size: 18px;
        font-weight: 600;
        color: #2563eb;
        margin: 0 0 16px 0;
      }
      .contact-info {
        display: grid;
        grid-template-columns: 1fr;
        gap: 4px;
        font-size: 12px;
      }
      .contact-item {
        display: flex;
        align-items: center;
      }
      .contact-icon {
        color: #2563eb;
        margin-right: 8px;
      }
      .section {
        margin-bottom: 20px;
        page-break-inside: avoid;
      }
      .section-title {
        font-size: 16px;
        font-weight: 600;
        text-transform: uppercase;
        margin: 0 0 12px 0;
        border-bottom: 1px solid #9ca3af;
        padding-bottom: 4px;
      }
      .job-item {
        margin-bottom: 20px;
        page-break-inside: avoid;
      }
      .job-item:not(:last-child) {
        border-bottom: 1px solid #e5e7eb;
        padding-bottom: 16px;
      }
      .job-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 4px;
      }
      .job-title {
        font-size: 14px;
        font-weight: 600;
        margin: 0;
      }
      .job-date {
        font-size: 12px;
        color: #6b7280;
      }
      .job-company {
        color: #2563eb;
        font-weight: 500;
        margin: 0 0 4px 0;
      }
      .job-location {
        font-size: 12px;
        color: #6b7280;
        margin: 0 0 8px 0;
      }
      .job-description {
        font-size: 12px;
        margin: 0 0 8px 0;
      }
      .job-responsibilities {
        margin: 0;
        padding-left: 20px;
        font-size: 12px;
      }
      .job-responsibilities li {
        margin-bottom: 2px;
      }
      .skills-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
      }
      .skill-tag {
        border: 1px solid #9ca3af;
        padding: 2px 8px;
        border-radius: 4px;
        font-size: 11px;
      }
      .education-item {
        margin-bottom: 16px;
        page-break-inside: avoid;
      }
      .education-item:not(:last-child) {
        border-bottom: 1px solid #e5e7eb;
        padding-bottom: 12px;
      }
      .education-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 4px;
      }
      .education-degree {
        font-size: 14px;
        font-weight: 600;
        margin: 0;
      }
      .education-date {
        font-size: 12px;
        color: #6b7280;
      }
      .education-institution {
        color: #2563eb;
        font-weight: 500;
        margin: 0 0 4px 0;
      }
      .education-location {
        font-size: 12px;
        color: #6b7280;
        margin: 0;
      }
      .languages-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
      }
      .language-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .language-info p {
        margin: 0;
      }
      .language-name {
        font-weight: 500;
        font-size: 12px;
      }
      .language-level {
        font-size: 11px;
        color: #6b7280;
      }
      .proficiency-bars {
        display: flex;
        gap: 2px;
      }
      .proficiency-bar {
        height: 16px;
        width: 4px;
        border-radius: 2px;
      }
      .proficiency-bar.filled {
        background-color: #2563eb;
      }
      .proficiency-bar.empty {
        background-color: #d1d5db;
      }
      .reference-item {
        margin-bottom: 8px;
      }
      .reference-name {
        font-weight: 500;
        color: #2563eb;
      }
      .reference-role {
        margin-left: 8px;
        font-size: 11px;
        background-color: #e5e7eb;
        padding: 1px 6px;
        border-radius: 2px;
      }
      .reference-company {
        margin-left: 4px;
        font-size: 11px;
        background-color: #d1d5db;
        padding: 1px 6px;
        border-radius: 2px;
      }
      .social-item {
        margin-bottom: 8px;
      }
      .social-platform {
        font-weight: 500;
        font-size: 12px;
      }
      .two-column-layout {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 28px;
      }
      .left-column {
        grid-column: 1;
      }
      .right-column {
        grid-column: 2;
      }
      @media print {
        .page-break {
          page-break-before: always;
        }
        .avoid-break {
          page-break-inside: avoid;
        }
      }
    </style>
    
    <div class="resume-container">
      <!-- Header -->
      <div class="header">
        <div class="header-content">
          <div class="header-left">
            <h1 class="name">${resumeData.personalInfo.name}</h1>
            <h2 class="title">${resumeData.personalInfo.title}</h2>
            <div class="contact-info">
              <div class="contact-item">
                <span class="contact-icon">📞</span>
                <span>${resumeData.personalInfo.phone}</span>
              </div>
              <div class="contact-item">
                <span class="contact-icon">✉️</span>
                <span>${resumeData.personalInfo.email}</span>
              </div>
              ${
                resumeData.personalInfo.website
                  ? `
                <div class="contact-item">
                  <span class="contact-icon">🔗</span>
                  <span>${resumeData.personalInfo.website}</span>
                </div>
              `
                  : ''
              }
              <div class="contact-item">
                <span class="contact-icon">📍</span>
                <span>${resumeData.personalInfo.location}</span>
              </div>
            </div>
          </div>
          ${
            resumeData.personalInfo.image
              ? `
            <div style="margin-left: 16px;">
              <img src="${resumeData.personalInfo.image}" alt="${resumeData.personalInfo.imageAlt}" 
                   style="width: 80px; height: 80px; border-radius: 50%;" />
            </div>
          `
              : ''
          }
        </div>
      </div>

      <div class="two-column-layout">
        <!-- Left Column -->
        <div class="left-column">
          <!-- Summary -->
          <div class="section">
            <h2 class="section-title">${resumeData.sections?.summary || 'Summary'}</h2>
            <p style="font-size: 12px; line-height: 1.5; margin: 0;">${resumeData.summary}</p>
          </div>

          <!-- Work Experience -->
          <div class="section">
            <h2 class="section-title">${resumeData.sections?.workExperience || 'Professional Experience'}</h2>
            ${resumeData.workExperience
              .map(
                (job: any, index: number) => `
              <div class="job-item">
                <div class="job-header">
                  <h3 class="job-title">${job.title}</h3>
                  <span class="job-date">${formatDate(job.startDate)} - ${formatDate(job.endDate)}</span>
                </div>
                <p class="job-company">${job.company}</p>
                <p class="job-location">📍 ${job.location}</p>
                <p class="job-description">${job.description}</p>
                ${
                  job.responsibilities.length > 0
                    ? `
                  <ul class="job-responsibilities">
                    ${job.responsibilities.map((resp: string) => `<li>${resp}</li>`).join('')}
                  </ul>
                `
                    : ''
                }
              </div>
            `,
              )
              .join('')}
          </div>

          <!-- References -->
          <div class="section">
            <h2 class="section-title">${resumeData.sections?.references || 'References'}</h2>
            ${resumeData.references
              .map(
                (reference: any) => `
              <div class="reference-item">
                <p style="font-size: 12px; margin: 0;">
                  <span class="reference-name">${reference.fullName}</span>
                  <span class="reference-role">${reference.role}</span>
                  <span class="reference-company">${reference.company}</span>
                </p>
                <p style="font-size: 12px; margin: 0;">${reference.email}</p>
              </div>
            `,
              )
              .join('')}
          </div>
        </div>

        <!-- Right Column -->
        <div class="right-column">
          <!-- Skills and Technologies -->
          ${
            resumeData.technologies.length > 0 || resumeData.skills.length > 0
              ? `
            <div class="section">
              <h2 class="section-title">${resumeData.sections?.toolbox || 'Skills & Technologies'}</h2>
              
              ${
                resumeData.technologies.length > 0
                  ? `
                <div style="margin-bottom: 12px;">
                  <h3 style="font-size: 14px; font-weight: 600; color: #2563eb; margin: 0 0 8px 0;">
                    ${resumeData.sections?.technologies || 'Technologies'}
                  </h3>
                  <div class="skills-grid">
                    ${resumeData.technologies
                      .map(
                        (tech: string) => `
                      <span class="skill-tag">${tech}</span>
                    `,
                      )
                      .join('')}
                  </div>
                </div>
              `
                  : ''
              }

              ${
                resumeData.skills.length > 0
                  ? `
                <div style="margin-bottom: 12px;">
                  <h3 style="font-size: 14px; font-weight: 600; color: #2563eb; margin: 0 0 8px 0;">
                    ${resumeData.sections?.professionalSkills || 'Professional Skills'}
                  </h3>
                  <div class="skills-grid">
                    ${resumeData.skills
                      .map(
                        (skill: string) => `
                      <span class="skill-tag">${skill}</span>
                    `,
                      )
                      .join('')}
                  </div>
                </div>
              `
                  : ''
              }
            </div>
          `
              : ''
          }

          <!-- Education -->
          <div class="section">
            <h2 class="section-title">${resumeData.sections?.education || 'Education'}</h2>
            ${resumeData.education
              .map(
                (edu: any, index: number) => `
              <div class="education-item">
                <div class="education-header">
                  <h3 class="education-degree">${edu.degree}</h3>
                  <span class="education-date">${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}</span>
                </div>
                <p class="education-institution">${edu.institution}</p>
                ${
                  edu.location
                    ? `
                  <p class="education-location">📍 ${edu.location}</p>
                `
                    : ''
                }
              </div>
            `,
              )
              .join('')}
          </div>

          <!-- Languages -->
          ${
            resumeData.languages.length > 0
              ? `
            <div class="section">
              <h2 class="section-title">${resumeData.sections?.languages || 'Languages'}</h2>
              <div class="languages-grid">
                ${resumeData.languages
                  .map(
                    (language: any) => `
                  <div class="language-item">
                    <div class="language-info">
                      <p class="language-name">${language.name}</p>
                      <p class="language-level">${language.level}</p>
                    </div>
                    <div class="proficiency-bars">
                      ${Array.from(
                        { length: 5 },
                        (_, i) => `
                        <div class="proficiency-bar ${i < language.proficiency ? 'filled' : 'empty'}"></div>
                      `,
                      ).join('')}
                    </div>
                  </div>
                `,
                  )
                  .join('')}
              </div>
            </div>
          `
              : ''
          }

          <!-- Notable Projects -->
          ${
            resumeData.notableProjects.length > 0
              ? `
            <div class="section">
              <h2 class="section-title">${resumeData.sections?.notableProjects || 'Notable Projects'}</h2>
              ${resumeData.notableProjects
                .map(
                  (project: any) => `
                <div style="margin-bottom: 12px;">
                  <p style="font-weight: 500; font-size: 12px; margin: 0 0 4px 0;">${project.title}</p>
                  <p style="font-size: 12px; margin: 0;">${project.description}</p>
                </div>
              `,
                )
                .join('')}
            </div>
          `
              : ''
          }

          <!-- Social Links -->
          ${
            resumeData.socialLinks.length > 0
              ? `
            <div class="section">
              <h2 class="section-title">${resumeData.sections?.findMeOnline || 'Professional Links'}</h2>
              ${resumeData.socialLinks
                .map(
                  (social: any) => `
                <div class="social-item">
                  <p class="social-platform">${social.platform}: ${social.displayText}</p>
                </div>
              `,
                )
                .join('')}
            </div>
          `
              : ''
          }
        </div>
      </div>
    </div>
  `;
};
