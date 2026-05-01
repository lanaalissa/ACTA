import { escapeHtml } from '../services/pdfService.js';

export function invoiceBody(projectData) {
  const data = Object.fromEntries(
    Object.entries(projectData).map(([key, value]) => [key, escapeHtml(value)])
  );
  const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;
  const issueDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  return `
    <div class="info-grid">
      <div class="info-box"><span class="label">Invoice Number</span>${invoiceNumber}</div>
      <div class="info-box"><span class="label">Issue Date</span>${issueDate}</div>
      <div class="info-box"><span class="label">From</span><strong>${data.freelancerName}</strong></div>
      <div class="info-box"><span class="label">Bill To</span><strong>${data.clientName}</strong><br><span class="muted">${data.clientEmail}</span></div>
    </div>

    <h2>Payment Request</h2>
    <table>
      <thead>
        <tr>
          <th>Description</th>
          <th>Terms</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${data.projectTitle}</td>
          <td>${data.paymentTerms}</td>
          <td>${data.currency} ${data.price}</td>
        </tr>
      </tbody>
    </table>

    <p class="total">Total Due: ${data.currency} ${data.price}</p>

    <h2>Notes</h2>
    <p>This invoice is a payment request for the project above. A receipt should be issued only after payment has been received or marked as paid.</p>
  `;
}
