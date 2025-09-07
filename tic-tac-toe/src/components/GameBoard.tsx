import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Player } from '@/hooks/useTicTacToe';

interface GameBoardProps {
  board: Player[];
  onCellClick: (index: number) => void;
  isGameOver: boolean;
  winner?: Player;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  board,
  onCellClick,
  isGameOver,
  winner,
}) => {
  return (
    <div className="grid grid-cols-3 gap-2 md:gap-3 w-fit mx-auto p-2 md:p-4">
      {board.map((cell, index) => (
        <Button
          key={index}
          variant="outline"
          className={cn(
            "w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-2xl sm:text-3xl md:text-5xl font-bold",
            "hover:bg-accent/50 transition-all duration-200",
            "hover:scale-105 active:scale-95",
            "border-2 rounded-lg md:rounded-xl shadow-sm",
            cell === 'X' && "text-blue-600 bg-blue-50 border-blue-200 animate-in zoom-in duration-300",
            cell === 'O' && "text-red-600 bg-red-50 border-red-200 animate-in zoom-in duration-300",
            isGameOver && !winner && "opacity-75",
            winner && "animate-pulse"
          )}
          onClick={() => onCellClick(index)}
          disabled={isGameOver || cell !== null}
          aria-label={`Cell ${index + 1}${cell ? `, contains ${cell}` : ', empty'}`}
        >
          <span className={cn(
            "transition-all duration-200",
            cell && "animate-in zoom-in-0 duration-300"
          )}>
            {cell}
          </span>
        </Button>
      ))}
    </div>
  );
};
