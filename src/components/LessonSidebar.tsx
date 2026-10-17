'use client';

import React from 'react';
import { Lesson, DifficultyLevel, DIFFICULTY_PRESETS } from '@/types';
import { CheckCircle2, Lock, Play } from 'lucide-react';

interface LessonSidebarProps {
  lessons: Lesson[];
  currentLessonId: string;
  completedLessonIds: string[];
  onSelectLesson: (lessonId: string) => void;
  difficulty: DifficultyLevel;
}

export const LessonSidebar: React.FC<LessonSidebarProps> = ({
  lessons,
  currentLessonId,
  completedLessonIds,
  onSelectLesson,
  difficulty,
}) => {
  const diffConfig = DIFFICULTY_PRESETS[difficulty];

  return (
    <div className="w-full lg:w-80 flex flex-col gap-3 p-4 bg-slate-900/70 border border-slate-800 rounded-2xl">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <h3 className="font-bold text-white text-base">Metodický plán výuky</h3>
        <span className="text-xs bg-slate-800 text-amber-400 font-semibold px-2 py-0.5 rounded-full border border-slate-700">
          {completedLessonIds.length} / {lessons.length}
        </span>
      </div>

      <div className="flex flex-col gap-2.5">
        {lessons.map((lesson, idx) => {
          const isCompleted = completedLessonIds.includes(lesson.id);
          const isCurrent = lesson.id === currentLessonId;

          // Dynamické cíle podle obtížnosti
          const targetAccuracy = Math.max(70, Math.min(100, lesson.minAccuracy + diffConfig.minAccuracyOffset));
          const targetCpm = Math.max(40, lesson.minCpm + diffConfig.minCpmOffset);

          // Pravidlo: Zákaz přeskakování lekcí bez splnění předchozí
          const isLocked = idx > 0 && !completedLessonIds.includes(lessons[idx - 1].id);

          return (
            <button
              key={lesson.id}
              disabled={isLocked}
              onClick={() => onSelectLesson(lesson.id)}
              className={`text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 relative ${
                isCurrent
                  ? 'bg-amber-500/10 border-amber-500/50 text-white shadow-sm ring-1 ring-amber-500/30'
                  : isLocked
                  ? 'bg-slate-900/40 border-slate-800/60 text-slate-600 opacity-60 cursor-not-allowed'
                  : 'bg-slate-850/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/50'
              }`}
            >
              <div className="mt-0.5">
                {isCompleted ? (
                  <CheckCircle2 size={18} className="text-emerald-400" />
                ) : isLocked ? (
                  <Lock size={18} className="text-slate-600" />
                ) : (
                  <Play size={18} className={isCurrent ? 'text-amber-400 fill-amber-400' : 'text-slate-400'} />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-xs text-slate-400 font-medium truncate">
                  {lesson.stageTitle} • Klávesy: {lesson.targetKeys.filter(k => k !== ' ').join(', ').toUpperCase()}
                </div>
                <div className={`text-sm font-semibold truncate ${isCurrent ? 'text-amber-400' : 'text-slate-200'}`}>
                  {lesson.title}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Cíl: <span className="text-slate-300 font-medium">{targetAccuracy} %</span> | <span className="text-slate-300 font-medium">{targetCpm} CPM</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
