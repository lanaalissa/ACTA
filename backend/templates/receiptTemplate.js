import { escapeHtml } from '../services/pdfService.js';

export function receiptBody(projectData) {
  const data = Object.fromEntries(
    Object.entries(projectData).map(([key, value]) => [key, escapeHtml(value)])
  );
  const receiptNumber = `RCT-${Date.now().toString().slice(-6)}`;

  return `
    <h1>Receipt</h1>
    <p class="meta">Receipt number: ${receiptNumber}</p>
    <p class="meta">Paid date: ${new Date().toLocaleDateString()}</p>

    <h2>Proof of Payment</h2>
    <p>This receipt confirms that payment has been marked as paid for <strong>${data.projectTitle}</strong>.</p>
    <p><strong>Received by:</strong> ${data.freelancerName}</p>
    <p><strong>Paid by:</strong> ${data.clientName} (${data.clientEmail})</p>
    <p class="total status-paid">Amount Paid: ${data.currency} ${data.price}</p>

    <h2>Reference</h2>
    <p>This receipt is proof of payment after payment was marked as paid. It is not a contract and not an invoice.</p>
  `;
}
