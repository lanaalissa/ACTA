import express from 'express';
import cors from 'cors';
import documentRoutes from './routes/documents.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/', (req, res) => {
  res.json({
    name: 'A.C.A.T API',
    status: 'running',
    routes: [
      'POST /api/documents/generate',
      'POST /api/documents/contract',
      'POST /api/documents/invoice',
      'POST /api/documents/receipt'
    ]
  });
});

app.use('/api/documents', documentRoutes);

app.listen(PORT, () => {
  console.log(`A.C.A.T backend running on http://localhost:${PORT}`);
});
