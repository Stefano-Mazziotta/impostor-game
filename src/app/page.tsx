'use client';

import GameRound from '@/components/GameRound';
import SetupScreen from '@/components/SetupScreen';
import type { GameScreen, Player } from '@/lib/types';
import { getRandomWord } from '@/lib/words';
import { useState } from 'react';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('setup');
  const [players, setPlayers] = useState<Player[]>([]);
  const [secretWord, setSecretWord] = useState('');
  const [numberOfImpostors, setNumberOfImpostors] = useState(1);

  const generateGame = (playerNames: string[], numImpostors: number) => {
    // Create player objects
    const newPlayers: Player[] = playerNames.map((name, index) => ({
      id: `player-${index}`,
      name,
      isImpostor: false,
      hasViewed: false,
    }));

    // Randomly select impostors
    const shuffledIndices = [...Array(newPlayers.length).keys()]
      .sort(() => Math.random() - 0.5);
    
    for (let i = 0; i < Math.min(numImpostors, newPlayers.length); i++) {
      newPlayers[shuffledIndices[i]].isImpostor = true;
    }

    // Select random word
    const word = getRandomWord();

    setPlayers(newPlayers);
    setSecretWord(word);
    setNumberOfImpostors(numImpostors);
    setCurrentScreen('game');
  };

  const handleStartGame = (playerNames: string[], numImpostors: number) => {
    generateGame(playerNames, numImpostors);
  };

  const handleNewRound = () => {
    // Keep same players but regenerate roles and word
    const playerNames = players.map(p => p.name);
    generateGame(playerNames, numberOfImpostors);
  };

  const handleBackToSetup = () => {
    setCurrentScreen('setup');
    setPlayers([]);
    setSecretWord('');
  };

  return (
    <>
      {currentScreen === 'setup' ? (
        <SetupScreen onStartGame={handleStartGame} />
      ) : (
        <GameRound
          players={players}
          secretWord={secretWord}
          onNewRound={handleNewRound}
          onBackToSetup={handleBackToSetup}
        />
      )}
    </>
  );
}
