// Path : hooks/useSobrietyStore.ts

import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { differenceInDays, isToday, parseISO, format, subDays, isWithinInterval, startOfDay } from "date-fns";

interface Profile {
  name: string;
}

interface SobrietyDay {
  date: string;
  completed: boolean;
}

interface SobrietyStats {
  currentStreak: number;
  bestStreak: number;
  totalSoberDays: number;
  last30DaysSober: number;
  last30DaysRatio: number;
  lastCheckin: string | null;
}

interface SobrietyState {
  profile: Profile | null;
  days: SobrietyDay[];
  stats: SobrietyStats;
}

interface SobrietyActions {
  updateProfile: (profile: Profile) => void;
  toggleDay: (dateString: string) => void;
  calculateStats: () => void;
  resetData: () => void;
}

const initialStats: SobrietyStats = {
  currentStreak: 0,
  bestStreak: 0,
  totalSoberDays: 0,
  last30DaysSober: 0,
  last30DaysRatio: 0,
  lastCheckin: null,
};

const initialState: SobrietyState = {
  profile: null,
  days: [],
  stats: initialStats,
};

export const useSobrietyStore = create<SobrietyState & SobrietyActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      updateProfile: (profile) => set({ profile }),

      toggleDay: (dateString) => {
        const targetDate = format(new Date(dateString), "yyyy-MM-dd");

        set((state) => {
          const existing = state.days.find(
            (d) => format(new Date(d.date), "yyyy-MM-dd") === targetDate
          );
          
          return {
            days: existing 
              ? state.days.filter(d => format(new Date(d.date), "yyyy-MM-dd") !== targetDate)
              : [...state.days, { date: dateString, completed: true }]
          };
        });

        get().calculateStats();
      },

      calculateStats: () => {
        const { days } = get();
        const today = startOfDay(new Date());
        const thirtyDaysAgo = startOfDay(subDays(today, 30));

        // Trier les jours
        const sortedDays = [...days]
          .sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime());

        // Calculer les streaks
        let currentStreak = 0;
        let bestStreak = 0;
        let tempStreak = 0;

        sortedDays.forEach((day, index) => {
          const currentDate = parseISO(day.date);

          if (index === 0) {
            tempStreak = 1;
          } else {
            const prevDate = parseISO(sortedDays[index - 1].date);
            const diff = differenceInDays(currentDate, prevDate);
            tempStreak = diff === 1 ? tempStreak + 1 : 1;
          }

          bestStreak = Math.max(bestStreak, tempStreak);
        });

        // Calculer la streak actuelle
        const lastDay = sortedDays[sortedDays.length - 1];
        if (lastDay) {
          const lastDate = parseISO(lastDay.date);
          currentStreak = tempStreak;
        }

        // Calculer les stats sur 30 jours
        const last30DaysSober = sortedDays.filter(day => {
          const date = parseISO(day.date);
          return isWithinInterval(date, { start: thirtyDaysAgo, end: today });
        }).length;

        set((state) => ({
          stats: {
            ...state.stats,
            currentStreak,
            bestStreak,
            totalSoberDays: sortedDays.length,
            last30DaysSober,
            last30DaysRatio: Math.round((last30DaysSober / 30) * 100),
            lastCheckin: lastDay?.date ?? null,
          },
        }));
      },

      resetData: () => {
        const profile = get().profile;
        set({ ...initialState, profile });
      },
    }),
    {
      name: "sobriety-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);