// app/(tabs)/progress.tsx

import React, { useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useSobrietyStore } from '@/hooks/useSobrietyStore';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { StatCard } from '@/components/progress/StatCard';
import { AchievementCard } from '@/components/progress/AchievementCard';
import { MonthlyStatsCard } from '@/components/progress/MonthlyStatsCard';
import { ACHIEVEMENTS, getGlobalStats } from '@/components/progress/ProgressData';

export default function ProgressScreen() {
  const { stats, calculateStats } = useSobrietyStore();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const globalStats = getGlobalStats(stats, colors);

  useEffect(() => {
    calculateStats();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.innerContainer}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <ThemedView style={styles.statsGrid}>
            {globalStats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </ThemedView>

          <MonthlyStatsCard
            soberDays={stats.last30DaysSober}
            ratio={stats.last30DaysRatio}
          />

          <ThemedText style={styles.sectionTitle}>Succès</ThemedText>

          <ThemedView style={styles.achievementsContainer}>
            {ACHIEVEMENTS.map((achievement) => (
              <AchievementCard
                key={achievement.title}
                {...achievement}
                isCompleted={stats.bestStreak >= achievement.target}
                current={Math.min(stats.bestStreak, achievement.target)}
              />
            ))}
          </ThemedView>
        </ScrollView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 110,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  achievementsContainer: {
    gap: 12,
  },
});