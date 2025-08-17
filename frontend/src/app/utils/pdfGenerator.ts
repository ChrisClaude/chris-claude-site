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

    // Add the container to the DOM temporarily
    document.body.appendChild(tempContainer);

    // Create the PDF content as HTML
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
    <div id="resume-pdf" style="font-family: Arial, sans-serif; font-size: 12px; line-height: 1.4; color: #1f2937;">
      <!-- Header -->
      <div style="border-bottom: 2px solid #d1d5db; padding-bottom: 20px; margin-bottom: 30px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div style="flex: 1;">
            <h1 style="font-size: 24px; font-weight: bold; margin: 0 0 8px 0; text-transform: uppercase;">
              ${resumeData.personalInfo.name}
            </h1>
            <h2 style="font-size: 18px; font-weight: 600; color: #2563eb; margin: 0 0 16px 0;">
              ${resumeData.personalInfo.title}
            </h2>
            <div style="display: grid; grid-template-columns: 1fr; gap: 4px; font-size: 12px;">
              <div style="display: flex; align-items: center;">
                <span style="color: #2563eb; margin-right: 8px;">📞</span>
                <span>${resumeData.personalInfo.phone}</span>
              </div>
              <div style="display: flex; align-items: center;">
                <span style="color: #2563eb; margin-right: 8px;">✉️</span>
                <span>${resumeData.personalInfo.email}</span>
              </div>
              ${
                resumeData.personalInfo.website
                  ? `
                <div style="display: flex; align-items: center;">
                  <span style="color: #2563eb; margin-right: 8px;">🔗</span>
                  <span>${resumeData.personalInfo.website}</span>
                </div>
              `
                  : ''
              }
              <div style="display: flex; align-items: center;">
                <span style="color: #2563eb; margin-right: 8px;">📍</span>
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

      <!-- Summary -->
      <div style="margin-bottom: 20px;">
        <h2 style="font-size: 16px; font-weight: 600; text-transform: uppercase; margin: 0 0 12px 0; border-bottom: 1px solid #9ca3af; padding-bottom: 4px;">
          ${resumeData.sections?.summary || 'Summary'}
        </h2>
        <p style="font-size: 12px; line-height: 1.5; margin: 0;">${resumeData.summary}</p>
      </div>

      <!-- Work Experience -->
      <div style="margin-bottom: 20px;">
        <h2 style="font-size: 16px; font-weight: 600; text-transform: uppercase; margin: 0 0 16px 0; border-bottom: 1px solid #9ca3af; padding-bottom: 4px;">
          ${resumeData.sections?.workExperience || 'Professional Experience'}
        </h2>
        ${resumeData.workExperience
          .map(
            (job: any, index: number) => `
          <div style="margin-bottom: ${index < resumeData.workExperience.length - 1 ? '20px' : '0'}; ${index < resumeData.workExperience.length - 1 ? 'border-bottom: 1px solid #e5e7eb; padding-bottom: 16px;' : ''}">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
              <h3 style="font-size: 14px; font-weight: 600; margin: 0;">${job.title}</h3>
              <span style="font-size: 12px; color: #6b7280;">${formatDate(job.startDate)} - ${formatDate(job.endDate)}</span>
            </div>
            <p style="color: #2563eb; font-weight: 500; margin: 0 0 4px 0;">${job.company}</p>
            <p style="font-size: 12px; color: #6b7280; margin: 0 0 8px 0;">📍 ${job.location}</p>
            <p style="font-size: 12px; margin: 0 0 8px 0;">${job.description}</p>
            ${
              job.responsibilities.length > 0
                ? `
              <ul style="margin: 0; padding-left: 20px; font-size: 12px;">
                ${job.responsibilities.map((resp: string) => `<li style="margin-bottom: 2px;">${resp}</li>`).join('')}
              </ul>
            `
                : ''
            }
          </div>
        `,
          )
          .join('')}
      </div>

      <!-- Skills and Technologies -->
      ${
        resumeData.technologies.length > 0 || resumeData.skills.length > 0
          ? `
        <div style="margin-bottom: 20px;">
          <h2 style="font-size: 16px; font-weight: 600; text-transform: uppercase; margin: 0 0 16px 0; border-bottom: 1px solid #9ca3af; padding-bottom: 4px;">
            ${resumeData.sections?.toolbox || 'Skills & Technologies'}
          </h2>
          
          ${
            resumeData.technologies.length > 0
              ? `
            <div style="margin-bottom: 12px;">
              <h3 style="font-size: 14px; font-weight: 600; color: #2563eb; margin: 0 0 8px 0;">
                ${resumeData.sections?.technologies || 'Technologies'}
              </h3>
              <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                ${resumeData.technologies
                  .map(
                    (tech: string) => `
                  <span style="border: 1px solid #9ca3af; padding: 2px 8px; border-radius: 4px; font-size: 11px;">
                    ${tech}
                  </span>
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
              <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                ${resumeData.skills
                  .map(
                    (skill: string) => `
                  <span style="border: 1px solid #9ca3af; padding: 2px 8px; border-radius: 4px; font-size: 11px;">
                    ${skill}
                  </span>
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
      <div style="margin-bottom: 20px;">
        <h2 style="font-size: 16px; font-weight: 600; text-transform: uppercase; margin: 0 0 16px 0; border-bottom: 1px solid #9ca3af; padding-bottom: 4px;">
          ${resumeData.sections?.education || 'Education'}
        </h2>
        ${resumeData.education
          .map(
            (edu: any, index: number) => `
          <div style="margin-bottom: ${index < resumeData.education.length - 1 ? '16px' : '0'}; ${index < resumeData.education.length - 1 ? 'border-bottom: 1px solid #e5e7eb; padding-bottom: 12px;' : ''}">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
              <h3 style="font-size: 14px; font-weight: 600; margin: 0;">${edu.degree}</h3>
              <span style="font-size: 12px; color: #6b7280;">${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}</span>
            </div>
            <p style="color: #2563eb; font-weight: 500; margin: 0 0 4px 0;">${edu.institution}</p>
            ${
              edu.location
                ? `
              <p style="font-size: 12px; color: #6b7280; margin: 0;">📍 ${edu.location}</p>
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
        <div style="margin-bottom: 20px;">
          <h2 style="font-size: 16px; font-weight: 600; text-transform: uppercase; margin: 0 0 16px 0; border-bottom: 1px solid #9ca3af; padding-bottom: 4px;">
            ${resumeData.sections?.languages || 'Languages'}
          </h2>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            ${resumeData.languages
              .map(
                (language: any) => `
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <p style="font-weight: 500; font-size: 12px; margin: 0;">${language.name}</p>
                  <p style="font-size: 11px; color: #6b7280; margin: 0;">${language.level}</p>
                </div>
                <div style="display: flex; gap: 2px;">
                  ${Array.from(
                    { length: 5 },
                    (_, i) => `
                    <div style="height: 16px; width: 4px; border-radius: 2px; background-color: ${i < language.proficiency ? '#2563eb' : '#d1d5db'};"></div>
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
        <div style="margin-bottom: 20px;">
          <h2 style="font-size: 16px; font-weight: 600; text-transform: uppercase; margin: 0 0 16px 0; border-bottom: 1px solid #9ca3af; padding-bottom: 4px;">
            ${resumeData.sections?.notableProjects || 'Notable Projects'}
          </h2>
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

      <!-- References -->
      ${
        resumeData.references.length > 0
          ? `
        <div style="margin-bottom: 20px;">
          <h2 style="font-size: 16px; font-weight: 600; text-transform: uppercase; margin: 0 0 16px 0; border-bottom: 1px solid #9ca3af; padding-bottom: 4px;">
            ${resumeData.sections?.references || 'References'}
          </h2>
          ${resumeData.references
            .map(
              (reference: any) => `
            <div style="margin-bottom: 8px;">
              <p style="font-size: 12px; margin: 0;">
                <span style="font-weight: 500; color: #2563eb;">${reference.fullName}</span>
                <span style="margin-left: 8px; font-size: 11px; background-color: #e5e7eb; padding: 1px 6px; border-radius: 2px;">${reference.role}</span>
                <span style="margin-left: 4px; font-size: 11px; background-color: #d1d5db; padding: 1px 6px; border-radius: 2px;">${reference.company}</span>
              </p>
              <p style="font-size: 12px; margin: 0;">${reference.email}</p>
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
        <div style="margin-bottom: 20px;">
          <h2 style="font-size: 16px; font-weight: 600; text-transform: uppercase; margin: 0 0 16px 0; border-bottom: 1px solid #9ca3af; padding-bottom: 4px;">
            ${resumeData.sections?.findMeOnline || 'Professional Links'}
          </h2>
          ${resumeData.socialLinks
            .map(
              (social: any) => `
            <div style="margin-bottom: 8px;">
              <p style="font-weight: 500; font-size: 12px; margin: 0;">${social.platform}: ${social.displayText}</p>
            </div>
          `,
            )
            .join('')}
        </div>
      `
          : ''
      }
    </div>
  `;
};
