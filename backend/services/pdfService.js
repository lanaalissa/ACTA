export function wrapHtmlDocument({ title, body }) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <style>
      :root {
        color: #17202a;
        font-family: Arial, Helvetica, sans-serif;
      }
      body {
        margin: 0;
        background: #eef2f7;
      }
      main {
        max-width: 820px;
        margin: 32px auto;
        background: #ffffff;
        padding: 48px;
        border: 1px solid #d9e2ec;
      }
      h1 {
        margin: 0 0 8px;
        font-size: 30px;
      }
      h2 {
        margin-top: 28px;
        border-bottom: 1px solid #d9e2ec;
        padding-bottom: 8px;
        font-size: 18px;
      }
      p, li {
        line-height: 1.65;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 16px;
      }
      th, td {
        border: 1px solid #d9e2ec;
        padding: 12px;
        text-align: left;
      }
      th {
        background: #f8fafc;
      }
      .meta {
        color: #52606d;
      }
      .total {
        font-size: 22px;
        font-weight: 800;
      }
      .status-paid {
        color: #12856f;
        font-weight: 800;
      }
      @media print {
        body {
          background: #ffffff;
        }
        main {
          margin: 0;
          max-width: none;
          border: 0;
        }
      }
    </style>
  </head>
  <body>
    <main>
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
