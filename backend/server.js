import express from 'express';
import cors from 'cors';
import documentRoutes from './routes/documents.js';

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

app.use(cors({
  origin(origin, callback) {
    if (!origin || origin === CLIENT_URL || /^http:\/\/localhost:517\d$/.test(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error('Not allowed by CORS'));
  }
}));
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

app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Route not found.' });
});

app.listen(PORT, () => {
  console.log(`A.C.A.T backend running on http://localhost:${PORT}`);
});
