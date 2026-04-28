# A.C.A.T - Automatic Contract AI Tool

A.C.A.T is a hackathon-ready MVP for freelancers and small businesses. It uses a guided chat flow to collect project details, then generates a contract draft, milestone plan, invoice, and a receipt only after the payment is marked as paid.

Contract means agreement. Invoice means payment request. Receipt means proof of payment after payment.

## Features

- Guided Q&A chatbot for project details
- Progress indicator while collecting answers
- Required-field validation
- Professional preview with agreement summary, milestones, contract draft, and invoice
- Generate contract, invoice, and receipt through backend APIs
- Receipt generation is disabled until payment is marked as paid
- Download generated documents as printable HTML files
- Demo data for fast testing
- Local JSON/in-memory storage only
- No authentication and no real payment integration

## Tech Stack

- React + Vite
- Tailwind CSS
- Node.js + Express
- Local JSON file storage

## Folder Structure

```text
ACAT/
├── README.md
├── .gitignore
├── package.json
├── frontend/
│   ├── package.json
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       ├── components/
│       │   ├── Landing.jsx
│       │   ├── ChatBot.jsx
│       │   ├── ProgressBar.jsx
│       │   ├── DocumentPreview.jsx
│       │   └── ActionButtons.jsx
│       ├── utils/
│       │   └── api.js
│       └── data/
│           └── demoData.js
└── backend/
    ├── package.json
    ├── server.js
    ├── routes/
    │   └── documents.js
    ├── controllers/
    │   └── documentController.js
    ├── services/
    │   ├── documentGenerator.js
    │   └── pdfService.js
    ├── templates/
    │   ├── contractTemplate.js
    │   ├── invoiceTemplate.js
    │   └── receiptTemplate.js
    └── data/
        └── savedDocuments.json
```

## Installation

From the repository root:

```bash
cd ACAT
npm install
npm run install:all
```

## Run Locally

Start both frontend and backend:

```bash
npm run dev
```

Or start each app in separate terminals:

```bash
npm run dev:backend
npm run dev:frontend
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Demo Flow

1. Open the frontend.
2. Click **Start Demo**.
3. Answer each chat question, or click **Use Demo Data**.
4. Review the agreement summary, milestone plan, contract draft, and invoice.
5. Click **Generate Contract** and **Generate Invoice** to download HTML documents.
6. Click **Mark as Paid**.
7. Click **Generate Receipt** to download proof of payment.

## Future Improvements

- Add real AI-assisted clause suggestions
- Export true PDF files using a server-side PDF renderer
- Add secure authentication and client portals
- Add payment-provider integrations
- Add reusable contract templates by industry
- Add e-signature workflow
