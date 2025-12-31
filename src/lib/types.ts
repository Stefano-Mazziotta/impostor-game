export interface Player {
  id: string;
  name: string;
  isImpostor: boolean;
  hasViewed: boolean;
}

export interface GameState {
  players: Player[];
  secretWord: string;
  numberOfImpostors: number;
  isGameStarted: boolean;
}

export type GameScreen = 'setup' | 'game';
