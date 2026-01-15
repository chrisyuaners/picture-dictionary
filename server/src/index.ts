import express from 'express';
import cors from 'cors';
import path from 'path';
import dictionaryRoutes from './routes/dictionary';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve audio files
app.use('/audio', express.static(path.join(__dirname, 'audio')));

// Routes
app.use('/api', dictionaryRoutes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
