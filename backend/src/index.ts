import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getGameState, handlePegClick, resetGame } from './controllers/gameController';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '3001', 10);
const HOST = process.env.HOST || '0.0.0.0';
const API_KEY = process.env.API_KEY || 'api-here';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Configure cors to only allow requests from the frontend
app.use(cors({
  origin: FRONTEND_URL,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// API key auth
const authenticateApiKey = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers.authorization?.split(' ')[1] || req.query.apiKey;
  
  if (!apiKey || apiKey !== API_KEY) {
    return res.status(401).json({ error: 'Unauthorized: Invalid API key' });
  }
  
  next();
};

// Health check route (no auth required)
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Apply auth to all game routes
app.use('/api/game', authenticateApiKey);

// Game routes
app.get('/api/game/:id?', getGameState);
app.post('/api/game/:id?/peg', handlePegClick);
app.post('/api/game/:id?/reset', resetGame);

// Start the server
app.listen(PORT, HOST, () => {
  console.log(`Server running on ${HOST}:${PORT}`);
}); 