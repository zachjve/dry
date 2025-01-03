// Path : types/sobriety.ts

export interface SobrietyDay {
  date: string;      // "2023-07-01T00:00:00.000Z"
  completed: boolean;
  notes?: string;
}

export interface SobrietyGoal {
  targetDays: number;
  startDate: string;
}

export interface SobrietyStats {
  currentStreak: number;
  bestStreak: number;
  totalSoberDays: number;
  lastCheckin: string | null;
}