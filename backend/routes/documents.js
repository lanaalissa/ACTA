import { Router } from 'express';
import {
  generateDocumentBundle,
  generateContract,
  generateInvoice,
  generateReceipt
} from '../controllers/documentController.js';

const router = Router();

router.post('/generate', generateDocumentBundle);
router.post('/contract', generateContract);
router.post('/invoice', generateInvoice);
router.post('/receipt', generateReceipt);

export default router;
