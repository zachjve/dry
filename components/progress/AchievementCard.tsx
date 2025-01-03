// components/progress/AchievementCard.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

interface AchievementCardProps {
  title: string;
  description: string;
  icon: string;
  isCompleted: boolean;
  target: number;
  current: number;
}

export function AchievementCard({
  title,
  description,
  icon,
  isCompleted,
  target,
  current,
}: AchievementCardProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
      <View style={styles.header}>
        <View style={[
          styles.iconWrapper,
          { 
            backgroundColor: isCompleted 
              ? `${colors.success}15` 
              : `${colors.achievementInactive}15`
          }
        ]}>
          <MaterialIcons 
            name={icon}
            size={24}
            color={isCompleted ? colors.success : colors.achievementInactive}
          />
        </View>
        <View style={styles.info}>
          <ThemedText style={styles.title}>{title}</ThemedText>
          <ThemedText style={[styles.description, { color: colors.icon }]}>
            {description}
          </ThemedText>
        </View>
        <AnimatedCircularProgress
          size={40}
          width={4}
          fill={(current / target) * 100}
          tintColor={isCompleted ? colors.success : colors.achievementActive}
          backgroundColor={colors.progressBackground}
          rotation={0}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    fontSize: 14,
  },
});