'use client';

import React from 'react';
import { Finger, KeyboardLayout } from '@/types';
import { CZECH_KEYBOARD_ROWS, FINGER_COLORS } from '@/data/keyboard';

interface VirtualKeyboardProps {
  layout: KeyboardLayout;
  activeChar?: string;
  pressedKey?: string;
  errorKey?: string;
  showFingerColors?: boolean;
}

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({
  layout,
  activeChar = '',
  pressedKey = '',
  errorKey = '',
  showFingerColors = true,
}) => {
  const rows = CZECH_KEYBOARD_ROWS[layout];

  const normalizeChar = (c: string) => c.toLowerCase();
  const currentTarget = normalizeChar(activeChar);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-800 shadow-2xl">
      <div className="flex flex-col gap-2">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-1.5 w-full">
            {row.map((key) => {
              const fingerInfo = FINGER_COLORS[key.finger];
              const isTarget =
                (currentTarget === ' ' && key.code === 'Space') ||
                (currentTarget !== ' ' &&
                  (normalizeChar(key.primary) === currentTarget ||
                    (key.secondary && normalizeChar(key.secondary) === currentTarget)));

              const isPressed =
                pressedKey.toLowerCase() === key.primary.toLowerCase() ||
                (key.code === 'Space' && pressedKey === ' ');

              const isError =
                errorKey.toLowerCase() === key.primary.toLowerCase() ||
                (key.code === 'Space' && errorKey === ' ');

              // Výchozí klávesy s hmatovými výstupky (F a J)
              const hasBumps = key.primary === 'F' || key.primary === 'J';

              // Styling klávesy
              let colorClass = 'bg-slate-800 text-slate-300 border-slate-700/60 hover:border-slate-600';
              if (showFingerColors) {
                colorClass = `${fingerInfo.bg} ${fingerInfo.border}`;
              }

              // Aktivní naváděcí stav (světelný pulz)
              let dynamicStateClass = '';
              if (isTarget) {
                dynamicStateClass =
                  'ring-4 ring-amber-400 bg-amber-400 text-slate-950 font-bold scale-105 shadow-[0_0_20px_rgba(251,191,36,0.6)] z-10 animate-pulse';
              } else if (isError) {
                dynamicStateClass =
                  'ring-4 ring-rose-500 bg-rose-600 text-white font-bold scale-95 shadow-[0_0_15px_rgba(244,63,94,0.7)]';
              } else if (isPressed) {
                dynamicStateClass = 'ring-2 ring-emerald-400 bg-emerald-500 text-slate-950 scale-95';
              }

              const widthClass = key.width || 'flex-1 min-w-[2.2rem] max-w-[3.4rem]';

              return (
                <div
                  key={key.code}
                  className={`
                    relative h-12 flex flex-col items-center justify-center rounded-lg border text-xs select-none transition-all duration-100
                    ${widthClass}
                    ${dynamicStateClass || colorClass}
                  `}
                >
                  {/* Sekundární znak (horní index např. 1, 2, 3...) */}
                  {key.secondary && (
                    <span className="text-[10px] opacity-60 leading-none absolute top-1 right-1">
                      {key.secondary}
                    </span>
                  )}

                  {/* Primární znak */}
                  <span className="font-semibold text-sm">
                    {key.primary === ' ' ? 'MEZERNÍK' : key.primary}
                  </span>

                  {/* Hmatové značky pro F a J */}
                  {hasBumps && (
                    <div className="absolute bottom-1 w-3 h-0.5 bg-current opacity-80 rounded-full" />
                  )}

                  {/* Malá barevná tečka prstu */}
                  {showFingerColors && !isTarget && (
                    <div
                      className={`absolute top-1 left-1 w-1.5 h-1.5 rounded-full ${fingerInfo.text.replace('text-', 'bg-')}`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legenda prstů */}
      {showFingerColors && (
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
          <div className="flex items-center gap-2">
            <span className="font-medium text-slate-300">Levá ruka:</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span> Malíček</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span> Prsteníček</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span> Prostředníček</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span> Ukazováček</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block"></span> Palce (Mezerník)
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-slate-300">Pravá ruka:</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-cyan-500 inline-block"></span> Ukazováček</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-teal-500 inline-block"></span> Prostředníček</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block"></span> Prsteníček</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-pink-500 inline-block"></span> Malíček</span>
          </div>
        </div>
      )}
    </div>
  );
};
