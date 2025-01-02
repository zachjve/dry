// Path : hooks/useSobrietyStore.ts

import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { SobrietyDay, SobrietyGoal, SobrietyStats } from "@/types/sobriety";
import { differenceInDays, isToday, parseISO } from "date-fns";

interface SobrietyState {
  days: SobrietyDay[];
  goals: SobrietyGoal;
  stats: SobrietyStats;
}

interface SobrietyActions {
  addDay: (day: SobrietyDay) => void;
  updateGoal: (goal: SobrietyGoal) => void;
  calculateStats: () => void;
  canCheckIn: () => boolean;
}

export const useSobrietyStore = create<SobrietyState & SobrietyActions>()(
  persist(
    (set, get) => ({
      days: [],
      goals: {
        targetDays: 30,
        startDate: new Date().toISOString(),
      },
      stats: {
        currentStreak: 0,
        bestStreak: 0,
        totalSoberDays: 0,
        lastCheckin: null,
      },

      addDay: (day) => {
        const state = get();
        if (!state.canCheckIn()) return;

        set((state) => ({
          days: [...state.days, day],
          stats: {
            ...state.stats,
            lastCheckin: day.date,
          },
        }));
        get().calculateStats();
      },

      updateGoal: (goal) => set({ goals: goal }),

      calculateStats: () => {
        const { days } = get();
        const sortedDays = [...days].sort(
          (a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime()
        );

        let currentStreak = 0;
        let bestStreak = 0;
        let streak = 0;

        sortedDays.forEach((day, index) => {
          if (index === 0) {
            streak = 1;
          } else {
            const prevDate = parseISO(sortedDays[index - 1].date);
            const currentDate = parseISO(day.date);
            const diff = differenceInDays(currentDate, prevDate);

            if (diff === 1) {
              streak++;
            } else {
              streak = 1;
            }
          }

          bestStreak = Math.max(bestStreak, streak);
          if (index === sortedDays.length - 1) {
            const lastDate = parseISO(day.date);
            if (
              isToday(lastDate) ||
              differenceInDays(new Date(), lastDate) === 1
            ) {
              currentStreak = streak;
            } else {
              currentStreak = 0;
            }
          }
        });

        set((state) => ({
          stats: {
            ...state.stats,
            currentStreak,
            bestStreak,
            totalSoberDays: days.length,
          },
        }));
      },

      canCheckIn: () => {
        const { stats } = get();
        if (!stats.lastCheckin) return true;

        const lastCheck = parseISO(stats.lastCheckin);
        return !isToday(lastCheck);
      },
    }),
    {
      name: "sobriety-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
