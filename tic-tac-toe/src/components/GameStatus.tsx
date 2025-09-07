import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Player } from '@/hooks/useTicTacToe';
import { RotateCcw, Trophy, Users } from 'lucide-react';

interface GameStatusProps {
  currentPlayer: 'X' | 'O';
  winner: Player;
  isGameOver: boolean;
  scores: { X: number; O: number; draws: number };
  onResetGame: () => void;
  onResetScores: () => void;
}

export const GameStatus: React.FC<GameStatusProps> = ({
  currentPlayer,
  winner,
  isGameOver,
  scores,
  onResetGame,
  onResetScores,
}) => {
  const getStatusMessage = () => {
    if (winner) {
      return `Player ${winner} wins! 🎉`;
    }
    if (isGameOver) {
      return "It's a draw! 🤝";
    }
    return `Player ${currentPlayer}'s turn`;
  };

  return (
    <div className="space-y-4">
      {/* Game Status */}
      <Card>
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl flex items-center justify-center gap-2">
            <Users className="w-6 h-6" />
            {getStatusMessage()}
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Scores */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Scoreboard
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-blue-600">{scores.X}</div>
              <div className="text-sm text-muted-foreground">Player X</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-gray-600">{scores.draws}</div>
              <div className="text-sm text-muted-foreground">Draws</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-red-600">{scores.O}</div>
              <div className="text-sm text-muted-foreground">Player O</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Control Buttons */}
      <div className="flex gap-2">
        <Button
          onClick={onResetGame}
          variant="outline"
          className="flex-1 flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          New Game
        </Button>
        <Button
          onClick={onResetScores}
          variant="secondary"
          className="flex-1"
        >
          Reset Scores
        </Button>
      </div>
    </div>
  );
};
