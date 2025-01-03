// constants/ProgressData.ts
import { Colors } from "@/constants/Colors";

export interface Achievement {
  title: string;
  description: string;
  icon: string;
  target: number;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    title: "Premier pas",
    description: "Votre première journée validée",
    icon: "flag",
    target: 1,
  },
  {
    title: "En route",
    description: "3 jours consécutifs",
    icon: "directions-walk",
    target: 3,
  },
  {
    title: "Sur la bonne voie",
    description: "7 jours consécutifs",
    icon: "directions-run",
    target: 7,
  },
  {
    title: "Deux semaines",
    description: "15 jours consécutifs",
    icon: "star-half",
    target: 15,
  },
  {
    title: "Un mois sobre",
    description: "30 jours consécutifs",
    icon: "verified",
    target: 30,
  },
  {
    title: "Habitude ancrée",
    description: "60 jours de sobriété",
    icon: "psychology",
    target: 60,
  },
  {
    title: "Transformation",
    description: "90 jours de nouvelle vie",
    icon: "auto-awesome",
    target: 90,
  }
];

export const getGlobalStats = (stats: any, colors: any) => [
  {
    label: "Série actuelle",
    value: stats.currentStreak,
    icon: "whatshot",
    color: colors.tint,
    suffix: "jours"
  },
  {
    label: "Record",
    value: stats.bestStreak,
    icon: "stars",
    color: colors.achievementActive,
    suffix: "jours"
  },
  {
    label: "Total validé",
    value: stats.totalSoberDays,
    icon: "event",
    color: colors.success,
    suffix: "jours"
  }
];