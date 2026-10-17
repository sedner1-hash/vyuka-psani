'use client';

import React, { useState, useEffect } from 'react';
import { INITIAL_LESSONS } from '@/data/lessons';
import { TypingTutor } from '@/components/TypingTutor';
import { LessonSidebar } from '@/components/LessonSidebar';
import { SessionResult, UserStats, DifficultyLevel, DIFFICULTY_PRESETS } from '@/types';
import { Flame, Keyboard, Sparkles, Sliders } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'pis_vsemi_deseti_stats_v1';

export default function Home() {
  const [currentLessonIndex, setCurrentLessonIndex] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('medium');
  const [userStats, setUserStats] = useState<UserStats>({
    xp: 0,
    level: 1,
    streak: 1,
    difficulty: 'medium',
    completedLessons: [],
    lessonBests: {},
    keyAccuracy: {},
    fingerAccuracy: {
      'left-pinky': { total: 0, errors: 0 },
      'left-ring': { total: 0, errors: 0 },
      'left-middle': { total: 0, errors: 0 },
      'left-index': { total: 0, errors: 0 },
      'right-index': { total: 0, errors: 0 },
      'right-middle': { total: 0, errors: 0 },
      'right-ring': { total: 0, errors: 0 },
      'right-pinky': { total: 0, errors: 0 },
      'thumb': { total: 0, errors: 0 },
    },
    recentSessions: [],
  });

  // Načtení z LocalStorage pro anonymní režim
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setUserStats(parsed);
        if (parsed.difficulty) {
          setDifficulty(parsed.difficulty);
        }
      }
    } catch {
      // Ignorovat
    }
  }, []);

  const saveStats = (newStats: UserStats) => {
    setUserStats(newStats);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newStats));
    } catch {
      // Ignore
    }
  };

  const handleDifficultyChange = (newDiff: DifficultyLevel) => {
    setDifficulty(newDiff);
    saveStats({
      ...userStats,
      difficulty: newDiff,
    });
  };

  const handleLessonComplete = (result: SessionResult) => {
    const currentLesson = INITIAL_LESSONS[currentLessonIndex];
    const passed = result.passed;

    const newCompleted = passed && !userStats.completedLessons.includes(currentLesson.id)
      ? [...userStats.completedLessons, currentLesson.id]
      : userStats.completedLessons;

    const earnedXp = passed ? 100 + Math.round(result.accuracy * 0.5) : 25;
    const totalXp = userStats.xp + earnedXp;
    const newLevel = Math.floor(totalXp / 250) + 1;

    const updatedBests = {
      ...userStats.lessonBests,
      [currentLesson.id]: {
        accuracy: Math.max(result.accuracy, userStats.lessonBests[currentLesson.id]?.accuracy || 0),
        cpm: Math.max(result.cpm, userStats.lessonBests[currentLesson.id]?.cpm || 0),
        wpm: Math.max(result.wpm, userStats.lessonBests[currentLesson.id]?.wpm || 0),
        date: new Date().toISOString(),
      },
    };

    const updated: UserStats = {
      ...userStats,
      xp: totalXp,
      level: newLevel,
      difficulty,
      completedLessons: newCompleted,
      lessonBests: updatedBests,
      recentSessions: [result, ...userStats.recentSessions.slice(0, 9)],
    };

    saveStats(updated);
  };

  const currentLesson = INITIAL_LESSONS[currentLessonIndex];
  const hasNextLesson = currentLessonIndex < INITIAL_LESSONS.length - 1;

  const handleNextLesson = () => {
    if (hasNextLesson) {
      setCurrentLessonIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Hlavní horní lišta */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center font-black text-slate-950 text-xl shadow-lg shadow-amber-500/20">
              <Keyboard size={22} />
            </div>
            <div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                Píš<span className="text-amber-400">Deseti</span>.cz
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] text-amber-300 font-bold bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Česká QWERTZ / QWERTY
              </span>
            </div>
          </div>

          {/* VÝRAZNÝ PŘEPÍNAČ OBTÍŽNOSTI V HLAVNÍM ZÁHLAVÍ */}
          <div className="flex items-center bg-slate-900 border-2 border-slate-700/80 rounded-2xl p-1.5 shadow-md">
            <div className="flex items-center gap-1.5 px-2.5 text-xs font-bold text-slate-300 uppercase tracking-wider">
              <Sliders size={15} className="text-amber-400" />
              <span>Obtížnost:</span>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => handleDifficultyChange('easy')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  difficulty === 'easy'
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30 scale-105'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                Snadná (88 %)
              </button>
              <button
                onClick={() => handleDifficultyChange('medium')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  difficulty === 'medium'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30 scale-105'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                Standard (95 %)
              </button>
              <button
                onClick={() => handleDifficultyChange('hard')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  difficulty === 'hard'
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30 scale-105'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                Expert (98 %)
              </button>
            </div>
          </div>

          {/* Gamifikace a status panel */}
          <div className="flex items-center gap-2.5">
            {/* Série */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/90 rounded-xl border border-slate-700 text-xs font-bold text-amber-400">
              <Flame size={16} className="text-amber-500 fill-amber-500" />
              <span>{userStats.streak} dny</span>
            </div>

            {/* Level */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/90 rounded-xl border border-slate-700 text-xs font-bold text-emerald-400">
              <Sparkles size={16} className="text-emerald-400" />
              <span>Úroveň {userStats.level}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hlavní obsah */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-6 flex flex-col lg:flex-row gap-6">
        {/* Levý panel s lekcemi */}
        <LessonSidebar
          lessons={INITIAL_LESSONS}
          currentLessonId={currentLesson.id}
          completedLessonIds={userStats.completedLessons}
          difficulty={difficulty}
          onSelectLesson={(lessonId) => {
            const index = INITIAL_LESSONS.findIndex((l) => l.id === lessonId);
            if (index !== -1) setCurrentLessonIndex(index);
          }}
        />

        {/* Hlavní výuková zóna */}
        <div className="flex-1 min-w-0">
          <TypingTutor
            lesson={currentLesson}
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            onLessonComplete={handleLessonComplete}
            onNextLesson={handleNextLesson}
            hasNextLesson={hasNextLesson}
          />
        </div>
      </main>

      {/* Patička */}
      <footer className="border-t border-slate-800/80 py-4 text-center text-xs text-slate-500">
        Výuková platforma pro psaní všemi deseti • Podpora české diakritiky a ergonomického prstokladu
      </footer>
    </div>
  );
}
