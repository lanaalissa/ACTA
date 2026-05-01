import { escapeHtml } from '../services/pdfService.js';

export function receiptBody(projectData) {
  const data = Object.fromEntries(
    Object.entries(projectData).map(([key, value]) => [key, escapeHtml(value)])
  );
  const receiptNumber = `RCT-${Date.now().toString().slice(-6)}`;
  const paidDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  return `
    <div class="info-grid">
      <div class="info-box"><span class="label">Receipt Number</span>${receiptNumber}</div>
      <div class="info-box"><span class="label">Paid Date</span>${paidDate}</div>
      <div class="info-box"><span class="label">Received By</span><strong>${data.freelancerName}</strong></div>
      <div class="info-box"><span class="label">Paid By</span><strong>${data.clientName}</strong><br><span class="muted">${data.clientEmail}</span></div>
    </div>

    <h2>Proof of Payment</h2>
    <p>This receipt confirms that payment has been marked as paid for <strong>${data.projectTitle}</strong>.</p>
    <p class="total status-paid">Amount Paid: ${data.currency} ${data.price}</p>

    <h2>Reference</h2>
    <p>This receipt is proof of payment after payment was marked as paid. It is not a contract and not a payment request.</p>
  `;
}
