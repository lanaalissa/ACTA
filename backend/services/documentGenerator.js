import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { contractBody } from '../templates/contractTemplate.js';
import { invoiceBody } from '../templates/invoiceTemplate.js';
import { receiptBody } from '../templates/receiptTemplate.js';
import { slugify, wrapHtmlDocument } from './pdfService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const savedDocumentsPath = path.join(__dirname, '..', 'data', 'savedDocuments.json');

const requiredFields = [
  'freelancerName',
  'clientName',
  'clientEmail',
  'projectTitle',
  'scope',
  'deliverables',
  'price',
  'currency',
  'deadline',
  'paymentTerms',
  'milestones'
];

export function validateProjectData(projectData) {
  if (!projectData || typeof projectData !== 'object') {
    const error = new Error('Project data is required.');
    error.statusCode = 400;
    throw error;
  }

  const missingFields = requiredFields.filter((field) => !String(projectData[field] || '').trim());

  if (missingFields.length > 0) {
    const error = new Error(`Missing required fields: ${missingFields.join(', ')}`);
    error.statusCode = 400;
    throw error;
  }
}

export function buildDocumentBundle(projectData, isPaid = false) {
  return {
    agreementSummary: {
      freelancerName: projectData.freelancerName,
      clientName: projectData.clientName,
      clientEmail: projectData.clientEmail,
      projectTitle: projectData.projectTitle,
      price: projectData.price,
      currency: projectData.currency,
      deadline: projectData.deadline,
      paymentStatus: isPaid ? 'Paid' : 'Unpaid'
    },
    milestonePlan: parseMilestones(projectData.milestones),
    contractPreview: contractBody(projectData),
    invoicePreview: invoiceBody(projectData),
    receiptAvailable: Boolean(isPaid)
  };
}

export function buildContractDocument(projectData) {
  const title = `Contract - ${projectData.projectTitle}`;
  return {
    type: 'contract',
    fileName: `${slugify(projectData.projectTitle)}-contract.html`,
    html: wrapHtmlDocument({ title, body: contractBody(projectData) })
  };
}

export function buildInvoiceDocument(projectData) {
  const title = `Invoice - ${projectData.projectTitle}`;
  return {
    type: 'invoice',
    fileName: `${slugify(projectData.projectTitle)}-invoice.html`,
    html: wrapHtmlDocument({ title, body: invoiceBody(projectData) })
  };
}

export function buildReceiptDocument(projectData) {
  const title = `Receipt - ${projectData.projectTitle}`;
  return {
    type: 'receipt',
    fileName: `${slugify(projectData.projectTitle)}-receipt.html`,
    html: wrapHtmlDocument({ title, body: receiptBody(projectData) })
  };
}

export async function saveDocumentRecord(type, projectData, document) {
  const existingRecords = await readSavedDocuments();
  const nextRecord = {
    id: `${type}-${Date.now()}`,
    type,
    projectTitle: projectData.projectTitle,
    clientName: projectData.clientName,
    createdAt: new Date().toISOString(),
    document
  };

  existingRecords.push(nextRecord);
  await fs.writeFile(savedDocumentsPath, JSON.stringify(existingRecords, null, 2));
  return nextRecord;
}

function parseMilestones(rawMilestones = '') {
  return rawMilestones
    .split('|')
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => {
      const [title, date] = item.split(':').map((part) => part.trim());
      return {
        title: title || item,
        date: date || ''
      };
    });
}

async function readSavedDocuments() {
  try {
    const contents = await fs.readFile(savedDocumentsPath, 'utf8');
    return JSON.parse(contents || '[]');
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}
