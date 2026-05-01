import { escapeHtml } from '../services/pdfService.js';

export function contractBody(projectData) {
  const data = sanitizeProject(projectData);

  return `
    <p class="meta">Agreement prepared for <strong>${data.projectTitle}</strong>.</p>

    <h2>Parties</h2>
    <div class="info-grid">
      <div class="info-box"><span class="label">Service Provider</span><strong>${data.freelancerName}</strong></div>
      <div class="info-box"><span class="label">Client</span><strong>${data.clientName}</strong><br><span class="muted">${data.clientEmail}</span></div>
    </div>
    <p>This service agreement is entered into by the parties listed above for the project described below. It is intended as a practical MVP contract draft for demo and review purposes.</p>

    <h2>Project Scope</h2>
    <p>${data.scope}</p>

    <h2>Deliverables</h2>
    <p>${data.deliverables}</p>

    <h2>Timeline</h2>
    <p>The provider will use commercially reasonable efforts to complete the project by <strong>${data.deadline}</strong>, subject to timely feedback, approvals, and materials from the client.</p>

    <h2>Fees and Payment Terms</h2>
    <p>The total project fee is <strong>${data.currency} ${data.price}</strong>.</p>
    <p>${data.paymentTerms}</p>

    <h2>Milestones</h2>
    <table>
      <thead><tr><th>Milestone</th><th>Target date</th></tr></thead>
      <tbody>${milestoneRows(data.milestones)}</tbody>
    </table>

    <h2>Review and Changes</h2>
    <p>Work outside the agreed scope, additional revision rounds, or material changes to approved deliverables should be confirmed in writing before the provider begins that additional work.</p>

    <h2>Additional Notes</h2>
    <p>${data.notes || 'No additional notes were provided.'}</p>

    <h2>Signatures</h2>
    <div class="signature-grid">
      <div class="signature-line"><strong>${data.freelancerName}</strong><br><span class="muted">Signature / Date</span></div>
      <div class="signature-line"><strong>${data.clientName}</strong><br><span class="muted">Signature / Date</span></div>
    </div>
  `;
}

function milestoneRows(rawMilestones) {
  return rawMilestones
    .split('|')
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => {
      const [title, date] = item.split(':').map((part) => part.trim());
      return `<tr><td>${escapeHtml(title || item)}</td><td>${escapeHtml(date || 'To be confirmed')}</td></tr>`;
    })
    .join('');
}

function sanitizeProject(projectData) {
  return Object.fromEntries(
    Object.entries(projectData).map(([key, value]) => [key, escapeHtml(value)])
  );
}
