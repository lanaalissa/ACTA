import { escapeHtml } from '../services/pdfService.js';

export function invoiceBody(projectData) {
  const data = Object.fromEntries(
    Object.entries(projectData).map(([key, value]) => [key, escapeHtml(value)])
  );
  const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;

  return `
    <h1>Invoice</h1>
    <p class="meta">Invoice number: ${invoiceNumber}</p>
    <p class="meta">Issue date: ${new Date().toLocaleDateString()}</p>

    <h2>Payment Request</h2>
    <p><strong>From:</strong> ${data.freelancerName}</p>
    <p><strong>Bill to:</strong> ${data.clientName} (${data.clientEmail})</p>

    <table>
      <thead>
        <tr>
          <th>Description</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${data.projectTitle}</td>
          <td>${data.currency} ${data.price}</td>
        </tr>
      </tbody>
    </table>

    <p class="total">Total Due: ${data.currency} ${data.price}</p>

    <h2>Payment Terms</h2>
    <p>${data.paymentTerms}</p>
    <p>This invoice is a payment request and is not a receipt.</p>
  `;
}
