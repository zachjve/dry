// Path : types/sobriety.ts

export interface SobrietyDay {
  date: string;
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
