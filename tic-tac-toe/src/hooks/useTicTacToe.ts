import { useState, useCallback, useEffect } from 'react';
import confetti from 'canvas-confetti';

export type Player = 'X' | 'O' | null;
export type Board = Player[];

interface GameState {
  board: Board;
  currentPlayer: 'X' | 'O';
  winner: Player;
  isGameOver: boolean;
  scores: { X: number; O: number; draws: number };
}

const WINNING_COMBINATIONS = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal top-left to bottom-right
  [2, 4, 6], // diagonal top-right to bottom-left
];

const checkWinner = (board: Board): Player => {
  for (const [a, b, c] of WINNING_COMBINATIONS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

const isBoardFull = (board: Board): boolean => {
  return board.every(cell => cell !== null);
};

export const useTicTacToe = () => {
  const [gameState, setGameState] = useState<GameState>({
    board: Array(9).fill(null),
    currentPlayer: 'X',
    winner: null,
    isGameOver: false,
    scores: { X: 0, O: 0, draws: 0 },
  });

  const makeMove = useCallback((index: number) => {
    setGameState(prev => {
      if (prev.board[index] || prev.isGameOver) {
        return prev; // Invalid move
      }

      const newBoard = [...prev.board];
      newBoard[index] = prev.currentPlayer;

      const winner = checkWinner(newBoard);
      const isGameOver = winner !== null || isBoardFull(newBoard);

      let newScores = prev.scores;
      if (isGameOver) {
        if (winner) {
          newScores = {
            ...prev.scores,
            [winner]: prev.scores[winner] + 1,
          };
        } else {
          newScores = {
            ...prev.scores,
            draws: prev.scores.draws + 1,
          };
        }
      }

      return {
        ...prev,
        board: newBoard,
        currentPlayer: prev.currentPlayer === 'X' ? 'O' : 'X',
        winner,
        isGameOver,
        scores: newScores,
      };
    });
  }, []);

  const resetGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      board: Array(9).fill(null),
      currentPlayer: 'X',
      winner: null,
      isGameOver: false,
    }));
  }, []);

  const resetScores = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      scores: { X: 0, O: 0, draws: 0 },
    }));
  }, []);

  // Trigger confetti when someone wins
  useEffect(() => {
    if (gameState.winner) {
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
      }, 250);

      // Cleanup interval on unmount
      return () => clearInterval(interval);
    }
  }, [gameState.winner]);

  return {
    ...gameState,
    makeMove,
    resetGame,
    resetScores,
  };
};
