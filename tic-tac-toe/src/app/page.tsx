'use client';

import React from 'react';
import { useTicTacToe } from '@/hooks/useTicTacToe';
import { GameBoard } from '@/components/GameBoard';
import { GameStatus } from '@/components/GameStatus';

export default function Home() {
  const {
    board,
    currentPlayer,
    winner,
    isGameOver,
    scores,
    makeMove,
    resetGame,
    resetScores,
  } = useTicTacToe();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mb-2">
            🎮 Tic-Tac-Toe
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Built with React 19 & Next.js
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Game Board */}
          <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl p-4 md:p-6 backdrop-blur-sm shadow-xl border border-white/20">
            <GameBoard
              board={board}
              onCellClick={makeMove}
              isGameOver={isGameOver}
              winner={winner}
            />
          </div>

          {/* Game Status */}
          <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl p-4 md:p-6 backdrop-blur-sm shadow-xl border border-white/20">
            <GameStatus
              currentPlayer={currentPlayer}
              winner={winner}
              isGameOver={isGameOver}
              scores={scores}
              onResetGame={resetGame}
              onResetScores={resetScores}
            />
          </div>
        </div>

        <footer className="text-center mt-8 text-gray-500 dark:text-gray-400">
          <p>Ready to deploy on Vercel! 🚀</p>
        </footer>
      </div>
    </div>
  );
}
