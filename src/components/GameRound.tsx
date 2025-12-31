'use client';

import type { Player } from '@/lib/types';
import { useState } from 'react';

interface GameRoundProps {
  players: Player[];
  secretWord: string;
  onNewRound: () => void;
  onBackToSetup: () => void;
}

export default function GameRound({ 
  players, 
  secretWord, 
  onNewRound, 
  onBackToSetup 
}: GameRoundProps) {
  const [revealedCards, setRevealedCards] = useState<Set<string>>(new Set());

  const toggleCard = (playerId: string) => {
    setRevealedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(playerId)) {
        newSet.delete(playerId);
      } else {
        newSet.add(playerId);
      }
      return newSet;
    });
  };

  const isCardRevealed = (playerId: string) => revealedCards.has(playerId);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-indigo-600 to-purple-700 p-4">
      <div className="mx-auto w-full max-w-4xl flex-1 pt-6 pb-6">
        <h1 className="mb-6 text-center text-3xl font-bold text-white">
          🎭 Ronda de Juego
        </h1>

        <div className="mb-6 rounded-xl bg-white/10 backdrop-blur-sm p-4 text-center">
          <p className="text-white text-lg">
            Toca una tarjeta para ver tu rol. ¡Pásalo en secreto!
          </p>
        </div>

        {/* Cards Grid */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {players.map((player) => {
            const revealed = isCardRevealed(player.id);
            
            return (
              <button
                key={player.id}
                onClick={() => toggleCard(player.id)}
                className="group relative h-48 w-full overflow-hidden rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  perspective: '1000px',
                }}
              >
                <div
                  className={`relative h-full w-full transition-all duration-500 ${
                    revealed ? 'rotate-y-180' : ''
                  }`}
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: revealed ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  }}
                >
                  {/* Front of card (face down) */}
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-6"
                    style={{
                      backfaceVisibility: 'hidden',
                    }}
                  >
                    <div className="mb-3 text-5xl">❓</div>
                    <h3 className="text-2xl font-bold text-white">
                      {player.name}
                    </h3>
                    <p className="mt-2 text-sm text-white/80">
                      Toca para revelar
                    </p>
                  </div>

                  {/* Back of card (revealed) */}
                  <div
                    className={`absolute inset-0 flex flex-col items-center justify-center p-6 ${
                      player.isImpostor
                        ? 'bg-gradient-to-br from-red-600 to-red-800'
                        : 'bg-gradient-to-br from-green-500 to-emerald-600'
                    }`}
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    {player.isImpostor ? (
                      <>
                        <div className="mb-3 text-6xl">🎭</div>
                        <h3 className="text-2xl font-bold text-white text-center">
                          Eres el IMPOSTOR
                        </h3>
                        <p className="mt-3 text-center text-white/90 text-sm">
                          ¡Descubre la palabra secreta!
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="mb-3 text-5xl">📝</div>
                        <p className="text-xl text-white/90 mb-2">
                          Tu palabra es:
                        </p>
                        <h3 className="text-3xl font-bold text-white">
                          {secretWord}
                        </h3>
                        <p className="mt-3 text-center text-white/90 text-sm">
                          ¡No la reveles al impostor!
                        </p>
                      </>
                    )}
                    <p className="mt-4 text-xs text-white/70">
                      Toca de nuevo para ocultar
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={onNewRound}
            className="flex-1 rounded-2xl bg-yellow-500 py-4 text-xl font-bold text-white shadow-lg transition-all hover:bg-yellow-600 active:scale-95"
          >
            🔄 Nueva Ronda
          </button>
          <button
            onClick={onBackToSetup}
            className="flex-1 rounded-2xl bg-gray-600 py-4 text-xl font-bold text-white shadow-lg transition-all hover:bg-gray-700 active:scale-95"
          >
            ← Volver a Configuración
          </button>
        </div>

        {/* Instructions */}
        <div className="mt-6 rounded-xl bg-white/10 backdrop-blur-sm p-4">
          <h3 className="mb-2 font-bold text-white text-center">
            📋 Instrucciones
          </h3>
          <ul className="space-y-1 text-sm text-white/90">
            <li>• Cada jugador debe ver su tarjeta en privado</li>
            <li>• Los impostores no conocen la palabra</li>
            <li>• ¡Discute y encuentra al impostor!</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
