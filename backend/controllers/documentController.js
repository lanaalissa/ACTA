import {
  buildDocumentBundle,
  buildContractDocument,
  buildInvoiceDocument,
  buildReceiptDocument,
  validateProjectData,
  saveDocumentRecord
} from '../services/documentGenerator.js';

function handleError(res, error) {
  const status = error.statusCode || 500;
  res.status(status).json({
    success: false,
    error: error.message || 'Unable to generate document'
  });
}

export async function generateDocumentBundle(req, res) {
  try {
    const { projectData, isPaid = false } = req.body;
    validateProjectData(projectData);
    const bundle = buildDocumentBundle(projectData, isPaid);
    await saveDocumentRecord('bundle', projectData, bundle);
    res.json({ success: true, data: bundle });
  } catch (error) {
    handleError(res, error);
  }
}

export async function generateContract(req, res) {
  try {
    const { projectData } = req.body;
    validateProjectData(projectData);
    const document = buildContractDocument(projectData);
    await saveDocumentRecord('contract', projectData, document);
    res.json({ success: true, data: document });
  } catch (error) {
    handleError(res, error);
  }
}

export async function generateInvoice(req, res) {
  try {
    const { projectData } = req.body;
    validateProjectData(projectData);
    const document = buildInvoiceDocument(projectData);
    await saveDocumentRecord('invoice', projectData, document);
    res.json({ success: true, data: document });
  } catch (error) {
    handleError(res, error);
  }
}

export async function generateReceipt(req, res) {
  try {
    const { projectData, isPaid = false } = req.body;
    validateProjectData(projectData);

    if (!isPaid) {
      const error = new Error('Receipt can only be generated after payment is marked as paid.');
      error.statusCode = 400;
      throw error;
    }

    const document = buildReceiptDocument(projectData);
    await saveDocumentRecord('receipt', projectData, document);
    res.json({ success: true, data: document });
  } catch (error) {
    handleError(res, error);
  }
}
