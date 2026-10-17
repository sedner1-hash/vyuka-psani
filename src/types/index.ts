export type Finger =
  | 'left-pinky'
  | 'left-ring'
  | 'left-middle'
  | 'left-index'
  | 'right-index'
  | 'right-middle'
  | 'right-ring'
  | 'right-pinky'
  | 'thumb';

export type KeyboardLayout = 'qwertz' | 'qwerty';

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface DifficultyConfig {
  id: DifficultyLevel;
  name: string;
  description: string;
  minAccuracyOffset: number; // odchylka v přesnosti, např. -5% pro snadnou
  minCpmOffset: number;      // odchylka v CPM, např. -30 pro snadnou
  badgeColor: string;
}

export const DIFFICULTY_PRESETS: Record<DifficultyLevel, DifficultyConfig> = {
  easy: {
    id: 'easy',
    name: 'Začátečník (Mírná)',
    description: 'Nižší nároky na rychlost a větší tolerance chyb (min. 88 % přesnost). Vhodné pro úplné začátky.',
    minAccuracyOffset: -7,
    minCpmOffset: -30,
    badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  },
  medium: {
    id: 'medium',
    name: 'Standard (Doporučeno)',
    description: 'Vyvážená obtížnost s důrazem na čistotu prstokladu (min. 95 % přesnost).',
    minAccuracyOffset: 0,
    minCpmOffset: 0,
    badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
  },
  hard: {
    id: 'hard',
    name: 'Expert (Přísná)',
    description: 'Mistrovský režim bez slitování (min. 98 % přesnost a vysoké tempo).',
    minAccuracyOffset: 3,
    minCpmOffset: 25,
    badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
  },
};

export interface KeyDefinition {
  primary: string;
  secondary?: string;
  code: string;
  finger: Finger;
  width?: string;
}

export interface Lesson {
  id: string;
  stage: number;
  stageTitle: string;
  title: string;
  description: string;
  targetKeys: string[];
  content: string;
  minAccuracy: number;
  minCpm: number;
  handGuide: {
    leftHome: string;
    rightHome: string;
    targetFinger: string;
    hint: string;
  };
}

export interface SessionResult {
  accuracy: number;
  cpm: number;
  wpm: number;
  timeSpentSeconds: number;
  mistakesCount: number;
  totalChars: number;
  keyStats: Record<string, { total: number; errors: number; avgMs?: number }>;
  fingerErrors: Record<Finger, number>;
  passed: boolean;
}

export interface UserStats {
  xp: number;
  level: number;
  streak: number;
  difficulty: DifficultyLevel;
  completedLessons: string[];
  lessonBests: Record<string, { accuracy: number; cpm: number; wpm: number; date: string }>;
  keyAccuracy: Record<string, { total: number; errors: number }>;
  fingerAccuracy: Record<Finger, { total: number; errors: number }>;
  recentSessions: SessionResult[];
}
