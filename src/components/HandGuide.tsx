'use client';

import React from 'react';
import { Finger } from '@/types';
import { FINGER_COLORS } from '@/data/keyboard';

interface HandGuideProps {
  targetFinger: Finger;
  targetKey: string;
}

export const HandGuide: React.FC<HandGuideProps> = ({ targetFinger, targetKey }) => {
  const fingerData = FINGER_COLORS[targetFinger];

  const isLeftHand = targetFinger.startsWith('left');
  const isRightHand = targetFinger.startsWith('right');
  const isThumb = targetFinger === 'thumb';

  return (
    <div className="w-full max-w-4xl mx-auto flex items-center justify-between p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 text-sm">
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg border shadow-sm ${
            targetFinger === 'thumb'
              ? 'bg-purple-600/30 border-purple-500 text-purple-300'
              : `${fingerData.bg} ${fingerData.border}`
          }`}
        >
          {targetKey === ' ' ? '␣' : targetKey.toUpperCase()}
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
            Doporučený prstoklad
          </div>
          <div className="text-slate-200 font-medium">
            <span className={`${fingerData.text} font-bold`}>{fingerData.label}</span> ({fingerData.hand})
          </div>
        </div>
      </div>

      <div className="hidden sm:flex items-center gap-4 text-xs text-slate-400">
        <div className={`px-2.5 py-1 rounded-md border ${isLeftHand ? 'border-amber-400/60 bg-amber-400/10 text-amber-300' : 'border-slate-800'}`}>
          Levá: <span className="font-mono text-slate-200">A - S - D - [F]</span>
        </div>
        <div className={`px-2.5 py-1 rounded-md border ${isThumb ? 'border-purple-400/60 bg-purple-400/10 text-purple-300' : 'border-slate-800'}`}>
          Palce: <span className="font-mono text-slate-200">[MEZERNÍK]</span>
        </div>
        <div className={`px-2.5 py-1 rounded-md border ${isRightHand ? 'border-cyan-400/60 bg-cyan-400/10 text-cyan-300' : 'border-slate-800'}`}>
          Pravá: <span className="font-mono text-slate-200">[J] - K - L - ů</span>
        </div>
      </div>
    </div>
  );
};
