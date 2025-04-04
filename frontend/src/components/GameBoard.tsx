import React, { useState, useEffect } from 'react';
import { GameState, Position } from '../types/api';
import { gameService } from '../services/gameService';

const GameBoard: React.FC = () => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch initial game state
  useEffect(() => {
    fetchGameState();
  }, []);
  
  const fetchGameState = async () => {
    try {
      setLoading(true);
      const gameState = await gameService.getGameState();
      setGameState(gameState);
      setError(null);
    } catch (err) {
      setError('Failed to fetch game state. Please try again.');
      console.error('Error fetching game state:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const handlePegClick = async (position: Position) => {
    if (loading || !gameState) return;
    
    try {
      setLoading(true);
      const updatedState = await gameService.handlePegClick(position);
      setGameState(updatedState);
      setError(null);
    } catch (err) {
      setError('Failed to update game. Please try again.');
      console.error('Error updating game:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const resetGame = async () => {
    try {
      setLoading(true);
      const resetState = await gameService.resetGame();
      setGameState(resetState);
      setError(null);
    } catch (err) {
      setError('Failed to reset game. Please try again.');
      console.error('Error resetting game:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Rendering
  if (loading && !gameState) {
    return <div className="my-4 text-center italic">Loading game...</div>;
  }
  
  if (error && !gameState) {
    return (
      <div className="my-4 p-3 bg-red-500/10 text-red-500 rounded-md">
        {error}
        <button 
          className="ml-3 bg-[var(--button-bg)] text-white border-0 py-1 px-3 rounded-md text-sm hover:bg-[var(--button-hover)]"
          onClick={fetchGameState}
        >
          Retry
        </button>
      </div>
    );
  }
  
  if (!gameState) {
    return <div className="my-4 p-3 bg-red-500/10 text-red-500 rounded-md">Unable to load game. Please try again later.</div>;
  }
  
  // Render the game board
  return (
    <div>
      {error && <div className="my-4 p-3 bg-red-500/10 text-red-500 rounded-md">{error}</div>}
      
      <div className="my-4 p-4 bg-[var(--card-bg)] rounded-md text-[var(--text-color)] font-medium text-lg">
        {gameState.isGameOver ? (
          <div>
            <h2 className="text-[var(--title-color)] mb-3 text-2xl font-bold">{gameState.countPegs === 1 ? 'You Win!' : 'Game Over'}</h2>
            <p className="mb-2 text-lg">Pegs remaining: {gameState.countPegs}</p>
            {gameState.countPegs === 1 && <p className="mb-2 text-lg">Congratulations! You're a Cracker Barrel peg game genius!</p>}
            {gameState.countPegs > 1 && <p className="mb-2 text-lg">No more valid moves. Try again to get down to one peg!</p>}
          </div>
        ) : (
          gameState.message
        )}
      </div>
      
      <div className="relative w-full h-[400px] my-8 mx-auto border border-white/10 rounded-lg bg-[var(--board-bg)] shadow-md overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[350px] h-[350px] translate-y-[40px]">
            {gameState.pegs.map((peg, index) => {
              const pegClasses = `absolute w-11 h-11 rounded-full transition-all duration-300 
                ${peg.hasPeg ? "bg-[var(--peg-color)] cursor-pointer shadow-md" : "bg-gray-300/30"} 
                ${peg.isSelected ? "bg-[var(--peg-selected)] scale-110" : ""} 
                ${peg.isValidTarget ? "border-2 border-dashed border-green-400" : ""}`;
              
              // Scale factor to increase spacing between pegs
              const scaleFactor = 1.25;
              
              // Calculate adjusted positions with scaling
              const adjustedLeft = peg.position.left < 50 
                ? 50 - ((50 - peg.position.left) * scaleFactor)
                : 50 + ((peg.position.left - 50) * scaleFactor);
              
              return (
                <div 
                  key={index} 
                  className={pegClasses}
                  style={{
                    top: `${peg.position.top * scaleFactor}px`,
                    left: `${adjustedLeft}%`,
                    transform: `translate(-50%, -50%)`,
                    opacity: loading ? 0.7 : 1,
                  }}
                  onClick={() => handlePegClick(index)}
                />
              );
            })}
          </div>
        </div>
      </div>
      
      <button 
        className="bg-[var(--button-bg)] text-white border-0 py-3 px-8 my-5 rounded-md text-base font-medium 
        hover:bg-[var(--button-hover)] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={resetGame} 
        disabled={loading}
      >
        {loading ? 'Restarting...' : 'Restart Game'}
      </button>
    </div>
  );
};

export default GameBoard; 