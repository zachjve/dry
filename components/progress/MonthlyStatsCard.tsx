// components/progress/MonthlyStatsCard.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

interface MonthlyStatsCardProps {
  soberDays: number;
  ratio: number;
}

export function MonthlyStatsCard({ soberDays, ratio }: MonthlyStatsCardProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const getStatusColor = (ratio: number) => {
    if (ratio >= 90) return colors.success;
    if (ratio >= 70) return colors.achievementActive;
    return colors.tint;
  };

  const statusColor = getStatusColor(ratio);

  return (
    <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
      <View style={styles.header}>
        <View style={styles.textContent}>
          <ThemedText style={styles.title}>30 derniers jours</ThemedText>
          <ThemedText style={[styles.subtitle, { color: colors.icon }]}>
            {soberDays} jours validés
          </ThemedText>
        </View>
        <AnimatedCircularProgress
          size={60}
          width={6}
          fill={ratio}
          tintColor={statusColor}
          backgroundColor={colors.progressBackground}
          rotation={0}
        >
          {() => (
            <ThemedText style={styles.percentage}>
              {ratio}%
            </ThemedText>
          )}
        </AnimatedCircularProgress>
      </View>
      
      <View style={[styles.footer, { backgroundColor: `${statusColor}15` }]}>
        <ThemedText style={[styles.status, { color: statusColor }]}>
          {ratio >= 90 ? "Excellent" : ratio >= 70 ? "Bien" : "En progression"}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  textContent: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  percentage: {
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
  },
});