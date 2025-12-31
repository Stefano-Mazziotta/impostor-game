'use client';

import { useState } from 'react';

interface SetupScreenProps {
  onStartGame: (playerNames: string[], numberOfImpostors: number) => void;
}

export default function SetupScreen({ onStartGame }: SetupScreenProps) {
  const [playerName, setPlayerName] = useState('');
  const [players, setPlayers] = useState<string[]>([]);
  const [numberOfImpostors, setNumberOfImpostors] = useState(1);

  const handleAddPlayer = () => {
    const trimmedName = playerName.trim();
    if (trimmedName && !players.includes(trimmedName)) {
      setPlayers([...players, trimmedName]);
      setPlayerName('');
    }
  };

  const handleRemovePlayer = (index: number) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddPlayer();
    }
  };

  const canStartGame = players.length >= 3;

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-purple-600 to-blue-600 p-4">
      <div className="mx-auto w-full max-w-md flex-1 pt-8 pb-6">
        <h1 className="mb-8 text-center text-4xl font-bold text-white">
          🎭 Impostor Game
        </h1>
        
        <div className="mb-6 rounded-2xl bg-white p-6 shadow-2xl">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Agregar Jugadores
          </h2>
          
          <div className="mb-4 flex gap-2">
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Nombre del jugador"
              className="flex-1 rounded-lg border-2 border-gray-300 px-4 py-3 text-gray-800 text-lg focus:border-purple-500 focus:outline-none"
              maxLength={20}
            />
            <button
              onClick={handleAddPlayer}
              disabled={!playerName.trim()}
              className="rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white transition-all hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              +
            </button>
          </div>

          {players.length > 0 && (
            <div className="space-y-2">
              {players.map((player, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg bg-gray-100 px-4 py-3"
                >
                  <span className="text-lg font-medium text-gray-800">
                    {player}
                  </span>
                  <button
                    onClick={() => handleRemovePlayer(index)}
                    className="text-red-500 hover:text-red-700 text-2xl font-bold w-8 h-8"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          {players.length > 0 && players.length < 3 && (
            <p className="mt-3 text-sm text-orange-600">
              Mínimo 3 jugadores requeridos
            </p>
          )}
        </div>

        <div className="mb-6 rounded-2xl bg-white p-6 shadow-2xl">
          <label htmlFor="impostors" className="mb-3 block text-xl font-semibold text-gray-800">
            Número de Impostores
          </label>
          <select
            id="impostors"
            value={numberOfImpostors}
            onChange={(e) => setNumberOfImpostors(Number(e.target.value))}
            className="w-full rounded-lg border-2 text-gray-800 border-gray-300 px-4 py-3 text-lg focus:border-purple-500 focus:outline-none"
          >
            <option value={1}>1 Impostor</option>
            <option value={2}>2 Impostores</option>
          </select>
        </div>

        <button
          onClick={() => onStartGame(players, numberOfImpostors)}
          disabled={!canStartGame}
          className="w-full rounded-2xl bg-green-500 py-4 text-xl font-bold text-white shadow-lg transition-all hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {canStartGame ? '🎮 Comenzar Juego' : '⏳ Agrega al menos 3 jugadores'}
        </button>

        {players.length > 0 && (
          <p className="mt-4 text-center text-white text-lg">
            {players.length} jugador{players.length !== 1 ? 'es' : ''} agregado{players.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>
    </div>
  );
}
