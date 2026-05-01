export function wrapHtmlDocument({ title, body, documentType = 'Document' }) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <style>
      :root { color: #17202a; font-family: Arial, Helvetica, sans-serif; }
      body {
        margin: 0;
        background: #edf2f7;
      }
      main {
        max-width: 860px;
        margin: 28px auto;
        background: #ffffff;
        padding: 52px;
        border: 1px solid #d8e2ee;
        box-shadow: 0 20px 60px rgba(23, 32, 42, 0.12);
      }
      h1 {
        margin: 0;
        font-size: 32px;
        letter-spacing: -0.02em;
      }
      h2 {
        margin: 30px 0 12px;
        border-bottom: 1px solid #d8e2ee;
        padding-bottom: 8px;
        font-size: 17px;
        text-transform: uppercase;
        letter-spacing: 0.08em;
      }
      p, li {
        line-height: 1.62;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin: 16px 0;
      }
      th, td {
        border: 1px solid #d8e2ee;
        padding: 12px 14px;
        text-align: left;
        vertical-align: top;
      }
      th {
        background: #f7fafc;
        color: #52606d;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.06em;
      }
      .doc-header {
        display: flex;
        justify-content: space-between;
        gap: 24px;
        border-bottom: 3px solid #17202a;
        padding-bottom: 20px;
        margin-bottom: 24px;
      }
      .brand {
        color: #52606d;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.16em;
        text-transform: uppercase;
      }
      .meta, .muted {
        color: #52606d;
      }
      .pill {
        display: inline-block;
        border: 1px solid #d8e2ee;
        border-radius: 999px;
        padding: 6px 10px;
        color: #52606d;
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
      }
      .info-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 14px;
      }
      .info-box {
        border: 1px solid #d8e2ee;
        background: #fbfdff;
        padding: 14px;
      }
      .label {
        display: block;
        margin-bottom: 4px;
        color: #52606d;
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.06em;
      }
      .total {
        background: #f7fafc;
        border: 1px solid #d8e2ee;
        padding: 16px;
        text-align: right;
        font-size: 22px;
        font-weight: 800;
      }
      .signature-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 24px;
        margin-top: 24px;
      }
      .signature-line {
        border-top: 1px solid #17202a;
        padding-top: 10px;
        min-height: 44px;
      }
      .status-paid {
        color: #12856f;
        font-weight: 800;
      }
      .print-toolbar {
        max-width: 860px;
        margin: 24px auto 0;
        text-align: right;
      }
      .print-toolbar button {
        border: 0;
        border-radius: 6px;
        background: #17202a;
        color: #fff;
        cursor: pointer;
        font: inherit;
        font-weight: 700;
        padding: 10px 14px;
      }
      @page { margin: 18mm; }
      @media print {
        body { background: #ffffff; }
        main {
          margin: 0;
          max-width: none;
          border: 0;
          box-shadow: none;
          padding: 0;
        }
        .print-toolbar { display: none; }
      }
      @media (max-width: 720px) {
        main { margin: 0; padding: 28px 20px; }
        .doc-header, .info-grid, .signature-grid { grid-template-columns: 1fr; display: grid; }
        .print-toolbar { margin: 0; padding: 12px; background: #ffffff; }
      }
    </style>
  </head>
  <body>
    <div class="print-toolbar">
      <button type="button" onclick="window.print()">Print or Save as PDF</button>
    </div>
    <main>
      <div class="doc-header">
        <div>
          <div class="brand">A.C.A.T</div>
          <h1>${escapeHtml(title)}</h1>
        </div>
        <div><span class="pill">${escapeHtml(documentType)}</span></div>
      </div>
      ${body}
    </main>
  </body>
</html>`;
}

export function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export function slugify(value = 'document') {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || 'document';
}
