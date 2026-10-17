'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  Lesson,
  KeyboardLayout,
  Finger,
  SessionResult,
  DifficultyLevel,
  DIFFICULTY_PRESETS,
} from '@/types';
import { VirtualKeyboard } from './VirtualKeyboard';
import { HandGuide } from './HandGuide';
import { getFingerForChar } from '@/data/keyboard';
import { soundManager } from '@/utils/sound';
import {
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  RotateCcw,
  CheckCircle2,
  Trophy,
  Zap,
  Target,
  ArrowRight,
  Flame,
  Award,
  Sliders,
} from 'lucide-react';

interface TypingTutorProps {
  lesson: Lesson;
  difficulty: DifficultyLevel;
  onDifficultyChange: (diff: DifficultyLevel) => void;
  onLessonComplete: (result: SessionResult) => void;
  onNextLesson?: () => void;
  hasNextLesson?: boolean;
}

export const TypingTutor: React.FC<TypingTutorProps> = ({
  lesson,
  difficulty,
  onDifficultyChange,
  onLessonComplete,
  onNextLesson,
  hasNextLesson,
}) => {
  const [layout, setLayout] = useState<KeyboardLayout>('qwertz');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [blindMode, setBlindMode] = useState<boolean>(false);
  const [showFingerColors, setShowFingerColors] = useState<boolean>(true);

  // Stav psaní
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [mistakes, setMistakes] = useState<number>(0);
  const [keystrokes, setKeystrokes] = useState<number>(0);
  const [lastPressed, setLastPressed] = useState<string>('');
  const [lastErrorKey, setLastErrorKey] = useState<string>('');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [sessionResult, setSessionResult] = useState<SessionResult | null>(null);

  // Časovače a metriky
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [cpm, setCpm] = useState<number>(0);
  const [wpm, setWpm] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(100);

  // Sledování chyb podle prstů a kláves
  const keyStatsRef = useRef<Record<string, { total: number; errors: number }>>({});
  const fingerErrorsRef = useRef<Record<Finger, number>>({
    'left-pinky': 0,
    'left-ring': 0,
    'left-middle': 0,
    'left-index': 0,
    'right-index': 0,
    'right-middle': 0,
    'right-ring': 0,
    'right-pinky': 0,
    'thumb': 0,
  });

  const content = lesson.content;
  const currentChar = currentIndex < content.length ? content[currentIndex] : '';
  const currentFinger = getFingerForChar(currentChar, layout);

  // Dynamický výpočet limitů podle vybrané obtížnosti
  const diffConfig = DIFFICULTY_PRESETS[difficulty];
  const targetAccuracy = Math.max(70, Math.min(100, lesson.minAccuracy + diffConfig.minAccuracyOffset));
  const targetCpm = Math.max(40, lesson.minCpm + diffConfig.minCpmOffset);

  // Reset při změně lekce
  const resetLesson = useCallback(() => {
    setCurrentIndex(0);
    setMistakes(0);
    setKeystrokes(0);
    setLastPressed('');
    setLastErrorKey('');
    setIsCompleted(false);
    setSessionResult(null);
    setStartTime(null);
    setElapsedSeconds(0);
    setCpm(0);
    setWpm(0);
    setAccuracy(100);
    keyStatsRef.current = {};
    fingerErrorsRef.current = {
      'left-pinky': 0,
      'left-ring': 0,
      'left-middle': 0,
      'left-index': 0,
      'right-index': 0,
      'right-middle': 0,
      'right-ring': 0,
      'right-pinky': 0,
      'thumb': 0,
    };
  }, []);

  useEffect(() => {
    resetLesson();
  }, [lesson.id, resetLesson]);

  // Časovač relace
  useEffect(() => {
    if (!startTime || isCompleted) return;
    const interval = setInterval(() => {
      const seconds = Math.max(1, Math.floor((Date.now() - startTime) / 1000));
      setElapsedSeconds(seconds);
      const calculatedCpm = Math.round((currentIndex / seconds) * 60);
      setCpm(calculatedCpm);
      setWpm(Math.round(calculatedCpm / 5));
    }, 500);
    return () => clearInterval(interval);
  }, [startTime, isCompleted, currentIndex]);

  // Dokončení lekce
  const finishLesson = useCallback(() => {
    setIsCompleted(true);
    const totalTime = Math.max(1, Math.floor((Date.now() - (startTime || Date.now())) / 1000));
    const finalAccuracy = keystrokes > 0 ? Math.round(((keystrokes - mistakes) / keystrokes) * 1000) / 10 : 100;
    const finalCpm = Math.round((content.length / totalTime) * 60);
    const finalWpm = Math.round(finalCpm / 5);
    const passed = finalAccuracy >= targetAccuracy && finalCpm >= targetCpm;

    const result: SessionResult = {
      accuracy: finalAccuracy,
      cpm: finalCpm,
      wpm: finalWpm,
      timeSpentSeconds: totalTime,
      mistakesCount: mistakes,
      totalChars: content.length,
      keyStats: keyStatsRef.current,
      fingerErrors: fingerErrorsRef.current,
      passed,
    };

    setSessionResult(result);
    onLessonComplete(result);

    if (passed) {
      soundManager.playSuccess();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [startTime, keystrokes, mistakes, content.length, targetAccuracy, targetCpm, onLessonComplete]);

  // Zpracování stisku klávesy
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isCompleted) return;

      // Ignorovat modifikační klávesy samotné
      if (['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Tab'].includes(e.key)) {
        return;
      }

      // Prevence scrollování u mezerníku
      if (e.key === ' ') {
        e.preventDefault();
      }

      // Spustit časovač při prvním stisku
      if (!startTime) {
        setStartTime(Date.now());
      }

      const pressed = e.key;
      setLastPressed(pressed);
      setKeystrokes((prev) => prev + 1);

      if (!keyStatsRef.current[currentChar]) {
        keyStatsRef.current[currentChar] = { total: 0, errors: 0 };
      }
      keyStatsRef.current[currentChar].total += 1;

      // Porovnání
      if (pressed === currentChar) {
        soundManager.playKeyClick();
        setLastErrorKey('');
        const nextIdx = currentIndex + 1;
        setCurrentIndex(nextIdx);

        const newAccuracy = Math.round(((keystrokes + 1 - mistakes) / (keystrokes + 1)) * 1000) / 10;
        setAccuracy(newAccuracy);

        if (nextIdx >= content.length) {
          finishLesson();
        }
      } else {
        // Chyba
        soundManager.playError();
        setMistakes((prev) => prev + 1);
        setLastErrorKey(pressed);
        keyStatsRef.current[currentChar].errors += 1;
        fingerErrorsRef.current[currentFinger] = (fingerErrorsRef.current[currentFinger] || 0) + 1;

        const newAccuracy = Math.max(0, Math.round(((keystrokes + 1 - (mistakes + 1)) / (keystrokes + 1)) * 1000) / 10);
        setAccuracy(newAccuracy);
      }
    },
    [isCompleted, startTime, currentChar, currentIndex, content.length, keystrokes, mistakes, currentFinger, finishLesson]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundManager.setEnabled(next);
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">
      {/* Horní panel nástrojů, obtížnosti a nastavení */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-md">
              {lesson.stageTitle}
            </span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-md border ${diffConfig.badgeColor}`}>
              {diffConfig.name}
            </span>
          </div>
          <h2 className="text-xl font-bold text-white">{lesson.title}</h2>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Volič obtížnosti */}
          <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700 text-xs items-center gap-1">
            <Sliders size={14} className="ml-1.5 text-slate-400" />
            {(['easy', 'medium', 'hard'] as DifficultyLevel[]).map((d) => (
              <button
                key={d}
                onClick={() => onDifficultyChange(d)}
                className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                  difficulty === d
                    ? d === 'easy'
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : d === 'medium'
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-rose-500 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {d === 'easy' ? 'Snadná' : d === 'medium' ? 'Standard' : 'Expert'}
              </button>
            ))}
          </div>

          {/* Rozložení QWERTZ / QWERTY */}
          <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700 text-xs">
            <button
              onClick={() => setLayout('qwertz')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                layout === 'qwertz' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              QWERTZ
            </button>
            <button
              onClick={() => setLayout('qwerty')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                layout === 'qwerty' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              QWERTY
            </button>
          </div>

          {/* Zvuk */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? 'Ztlumit zvuk kláves' : 'Zapnout zvuk kláves'}
            className={`p-2 rounded-xl border transition ${
              soundEnabled
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* Slepecký režim */}
          <button
            onClick={() => setBlindMode(!blindMode)}
            title={blindMode ? 'Vypnout slepecký režim' : 'Zapnout slepecký režim (zákaz dívání)'}
            className={`p-2 rounded-xl border transition ${
              blindMode
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            {blindMode ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>

          {/* Reset */}
          <button
            onClick={resetLesson}
            title="Spustit lekci znovu"
            className="p-2 rounded-xl border border-slate-700 bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Živé statistiky (HUD) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 flex items-center gap-3">
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-lg">
            <Target size={20} />
          </div>
          <div>
            <div className="text-xs text-slate-400 uppercase font-semibold">
              Přesnost (cíl: {targetAccuracy} %)
            </div>
            <div className={`text-2xl font-bold ${accuracy >= targetAccuracy ? 'text-emerald-400' : 'text-rose-400'}`}>
              {accuracy}%
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 flex items-center gap-3">
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg">
            <Zap size={20} />
          </div>
          <div>
            <div className="text-xs text-slate-400 uppercase font-semibold">
              Rychlost (cíl: {targetCpm} CPM)
            </div>
            <div className={`text-2xl font-bold ${cpm >= targetCpm ? 'text-blue-400' : 'text-slate-200'}`}>
              {cpm} <span className="text-xs text-slate-400 font-normal">úhozů/min</span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 flex items-center gap-3">
          <div className="p-3 bg-purple-500/10 text-purple-400 rounded-lg">
            <Trophy size={20} />
          </div>
          <div>
            <div className="text-xs text-slate-400 uppercase font-semibold">Slova (WPM)</div>
            <div className="text-2xl font-bold text-purple-400">
              {wpm} <span className="text-xs text-slate-400 font-normal">slov/min</span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 flex items-center gap-3">
          <div className="p-3 bg-rose-500/10 text-rose-400 rounded-lg">
            <Flame size={20} />
          </div>
          <div>
            <div className="text-xs text-slate-400 uppercase font-semibold">Chyby / Čas</div>
            <div className="text-2xl font-bold text-slate-200">
              {mistakes} <span className="text-xs text-slate-400 font-normal">({elapsedSeconds}s)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tréninkový text */}
      <div className="relative p-8 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden min-h-[140px] flex items-center justify-center">
        {blindMode && (
          <div className="absolute top-2 right-3 text-xs bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded">
            Slepecký režim aktivní
          </div>
        )}

        <div className="font-mono text-2xl md:text-3xl tracking-wide select-none flex flex-wrap justify-center gap-y-2 leading-relaxed">
          {content.split('').map((char, index) => {
            const isDone = index < currentIndex;
            const isCurrent = index === currentIndex;

            let charStyle = 'text-slate-500';
            if (isDone) {
              charStyle = 'text-emerald-400 font-medium';
            } else if (isCurrent) {
              charStyle = 'text-white bg-amber-500/30 border-b-4 border-amber-400 font-bold px-0.5 animate-pulse rounded-t';
            }

            return (
              <span key={index} className={`relative transition-colors ${charStyle}`}>
                {char === ' ' ? (isCurrent ? '␣' : '\u00A0') : char}
              </span>
            );
          })}
        </div>
      </div>

      {/* Průvodce prstem a rukou */}
      <HandGuide targetFinger={currentFinger} targetKey={currentChar} />

      {/* Virtuální klávesnice */}
      <VirtualKeyboard
        layout={layout}
        activeChar={currentChar}
        pressedKey={lastPressed}
        errorKey={lastErrorKey}
        showFingerColors={showFingerColors}
      />

      {/* Modal po dokončení lekce */}
      {isCompleted && sessionResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl flex flex-col items-center text-center">
            {sessionResult.passed ? (
              <>
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mb-4">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">Skvělá práce! Lekce splněna!</h3>
                <p className="text-sm text-slate-400 mb-6">
                  Splnili jste podmínky pro obtížnost <span className="text-amber-400 font-semibold">{diffConfig.name}</span> (přesnost: {targetAccuracy} %, rychlost: {targetCpm} CPM).
                </p>
              </>
            ) : (
              <>
                <div className="w-16 h-16 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/40 flex items-center justify-center mb-4">
                  <Award size={36} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">Ještě kousek tréninku!</h3>
                <p className="text-sm text-slate-400 mb-6">
                  Pro splnění na obtížnost <span className="text-rose-400 font-semibold">{diffConfig.name}</span> je potřeba alespoň {targetAccuracy} % přesnost a {targetCpm} CPM.
                </p>
              </>
            )}

            <div className="grid grid-cols-3 gap-3 w-full mb-6">
              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
                <div className="text-xs text-slate-400">Přesnost</div>
                <div className={`text-xl font-bold ${sessionResult.passed ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {sessionResult.accuracy}%
                </div>
              </div>
              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
                <div className="text-xs text-slate-400">Rychlost</div>
                <div className="text-xl font-bold text-blue-400">{sessionResult.cpm} CPM</div>
              </div>
              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
                <div className="text-xs text-slate-400">Čas</div>
                <div className="text-xl font-bold text-purple-400">{sessionResult.timeSpentSeconds}s</div>
              </div>
            </div>

            <div className="flex gap-3 w-full">
              <button
                onClick={resetLesson}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition flex items-center justify-center gap-2"
              >
                <RotateCcw size={18} /> Zkusit znovu
              </button>

              {sessionResult.passed && hasNextLesson && (
                <button
                  onClick={onNextLesson}
                  className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                >
                  Další lekce <ArrowRight size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
