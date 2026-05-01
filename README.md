# A.C.A.T - Automatic Contract AI Tool

A.C.A.T is a lightweight hackathon MVP for freelancers and small businesses. It collects project details through a guided intake flow, then generates a contract draft, milestone plan, invoice, and receipt after payment is marked as paid.

## What Works

- Guided Q&A intake with validation and demo data
- Editable project details after generation
- Backend-generated contract, invoice, and receipt documents
- Printable HTML exports with a built-in "Print or Save as PDF" button
- Receipt locked until payment is marked as paid
- Loading, success, error, and disabled states
- Local JSON record of generated documents

## Tech Stack

- React + Vite
- Tailwind CSS
- Node.js + Express
- Local JSON file storage

## Environment

No environment variables are required for the default local demo. Optional values are documented in `.env.example`:

- `PORT`: backend port, default `5000`
- `CLIENT_URL`: frontend URL allowed by backend CORS, default `http://localhost:5173`
- `VITE_API_URL`: frontend API base URL, default `http://localhost:5000/api`

## Install

From the repository root:

```bash
npm install
```

The root `postinstall` script installs backend and frontend dependencies too. If you want to run those manually:

```bash
npm run install:all
```

## Run Locally

```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

You can also run each app separately:

```bash
npm run dev:backend
npm run dev:frontend
```

## Demo Flow

1. Open the frontend.
2. Click `Start Demo`.
3. Answer each intake question or click `Use Demo Data`.
4. Review the agreement summary, milestones, contract, and invoice.
5. Edit details if needed and save to regenerate.
6. Download the contract and invoice.
7. Click `Mark as Paid`.
8. Download the receipt, then open any exported HTML file to print or save as PDF.

## API

- `POST /api/documents/generate`
- `POST /api/documents/contract`
- `POST /api/documents/invoice`
- `POST /api/documents/receipt`

All document endpoints expect:

```json
{
  "projectData": {
    "freelancerName": "Maya Studio LLC",
    "clientName": "BrightPath Learning",
    "clientEmail": "hello@brightpath.example",
    "projectTitle": "Course Landing Page Redesign",
    "scope": "Design and build a responsive landing page.",
    "deliverables": "Discovery brief, design, Vite page, launch checklist",
    "price": "2400",
    "currency": "USD",
    "deadline": "2026-06-15",
    "paymentTerms": "50% upfront and 50% upon final delivery",
    "milestones": "Discovery: 2026-05-10 | Design: 2026-05-24",
    "notes": "Includes two revision rounds."
  },
  "isPaid": false
}
```

Receipt generation requires `"isPaid": true`.
