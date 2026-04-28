import { escapeHtml } from '../services/pdfService.js';

export function contractBody(projectData) {
  const data = sanitizeProject(projectData);

  return `
    <h1>Contract Draft</h1>
    <p class="meta">Agreement prepared for ${data.projectTitle}</p>

    <h2>Parties</h2>
    <p>This agreement is between <strong>${data.freelancerName}</strong> and <strong>${data.clientName}</strong> (${data.clientEmail}).</p>

    <h2>Project Scope</h2>
    <p>${data.scope}</p>

    <h2>Deliverables</h2>
    <p>${data.deliverables}</p>

    <h2>Timeline</h2>
    <p>The final deadline for this project is <strong>${data.deadline}</strong>.</p>

    <h2>Fees and Payment Terms</h2>
    <p>The total project fee is <strong>${data.currency} ${data.price}</strong>. Payment terms: ${data.paymentTerms}</p>

    <h2>Milestones</h2>
    <ul>${milestoneItems(data.milestones)}</ul>

    <h2>Additional Notes</h2>
    <p>${data.notes || 'No additional notes were provided.'}</p>

    <h2>Signatures</h2>
    <p>Freelancer signature: __________________________ Date: __________</p>
    <p>Client signature: ______________________________ Date: __________</p>
  `;
}

function milestoneItems(rawMilestones) {
  return rawMilestones
    .split('|')
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join('');
}

function sanitizeProject(projectData) {
  return Object.fromEntries(
    Object.entries(projectData).map(([key, value]) => [key, escapeHtml(value)])
  );
}
