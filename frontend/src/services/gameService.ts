import axios from 'axios';
import { GameState, Position, HealthResponse } from '../types/api';

// API URL - using the proxy configured in webpack
const API_URL = '/api';

// API key from environment variable
const API_KEY = process.env.API_KEY || 'api-here';

// Create axios instance with default settings
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  },
});

const getEndpoint = (path: string, gameId?: string): string => {
  return gameId ? `${path}/${gameId}` : path;
};

export const gameService = {
  // Get the current game state
  getGameState: async (gameId?: string): Promise<GameState> => {
    const response = await apiClient.get<GameState>(getEndpoint('/game', gameId));
    return response.data;
  },

  // Handle a peg click
  handlePegClick: async (position: Position, gameId?: string): Promise<GameState> => {
    const response = await apiClient.post<GameState>(
      getEndpoint('/game', gameId) + '/peg',
      { position }
    );
    return response.data;
  },

  // Reset the game
  resetGame: async (gameId?: string): Promise<GameState> => {
    const response = await apiClient.post<GameState>(
      getEndpoint('/game', gameId) + '/reset'
    );
    return response.data;
  },

  // Check server health
  checkHealth: async (): Promise<HealthResponse> => {
    const response = await apiClient.get<HealthResponse>('/health');
    return response.data;
  }
}; 