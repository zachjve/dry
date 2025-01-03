// Path : components/CircularProgressObjectives.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

interface Props {
  milestones: number[];
  currentStreak: number;
}

export function CircularProgressObjectives({ milestones, currentStreak }: Props) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const [activeIndex, setActiveIndex] = useState<number>(0);
  
  const milestone = milestones[activeIndex];
  const rawPercent = (currentStreak / milestone) * 100;
  const fill = Math.min(Math.round(rawPercent), 100);

  const goPrev = () => {
    if (activeIndex > 0) setActiveIndex(activeIndex - 1);
  };
  const goNext = () => {
    if (activeIndex < milestones.length - 1) setActiveIndex(activeIndex + 1);
  };

  const getStatusColor = (percent: number) => {
    if (percent >= 100) return colors.success;
    if (percent >= 75) return colors.achievementActive;
    return colors.tint;
  };

  const statusColor = getStatusColor(fill);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={[styles.title, { color: colors.text }]}>
          Objectif {milestone} {milestone === 1 ? "jour" : "jours"}
        </Text>
        <View style={[styles.badge, { backgroundColor: `${statusColor}22` }]}>
          <Text style={[styles.badgeText, { color: statusColor }]}>
            {currentStreak} / {milestone}
          </Text>
        </View>
      </View>

      <View style={styles.navContainer}>
        <TouchableOpacity
          style={[
            styles.chevronButton,
            { backgroundColor: colors.cardBackground },
            activeIndex === 0 && styles.disabled
          ]}
          onPress={goPrev}
          disabled={activeIndex === 0}
        >
          <MaterialIcons 
            name="chevron-left" 
            size={32} 
            color={activeIndex === 0 ? colors.calendarDisabled : colors.icon}
          />
        </TouchableOpacity>

        <View style={styles.progressContainer}>
          <AnimatedCircularProgress
            size={220}
            width={24}
            fill={fill}
            tintColor={statusColor}
            backgroundColor={colors.progressBackground}
            lineCap="round"
            rotation={0}
            arcSweepAngle={300}
            style={styles.progress}
          >
            {() => (
              <View style={styles.innerContent}>
                <Text style={[styles.percentText, { color: colors.text }]}>
                  {fill}%
                </Text>
                <Text style={[styles.streakText, { color: colors.icon }]}>
                  {currentStreak} jours
                </Text>
              </View>
            )}
          </AnimatedCircularProgress>
          
          {fill >= 100 && (
            <View style={[styles.completeBadge, { backgroundColor: colors.success }]}>
              <MaterialIcons name="check" size={20} color={colors.cardBackground} />
            </View>
          )}
        </View>

        <TouchableOpacity
          style={[
            styles.chevronButton,
            { backgroundColor: colors.cardBackground },
            activeIndex === milestones.length - 1 && styles.disabled,
          ]}
          onPress={goNext}
          disabled={activeIndex === milestones.length - 1}
        >
          <MaterialIcons 
            name="chevron-right" 
            size={32} 
            color={activeIndex === milestones.length - 1 ? colors.calendarDisabled : colors.icon}
          />
        </TouchableOpacity>
      </View>

      <Text style={[styles.subtitle, { color: statusColor }]}>
        {fill >= 100 
          ? "Objectif atteint ! 🎉" 
          : `${fill}% de l'objectif atteint`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 24,
    paddingHorizontal: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: "600",
  },
  navContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    width: '100%',
  },
  progressContainer: {
    position: 'relative',
    marginHorizontal: 16,
  },
  progress: {
    transform: [{ rotate: '120deg' }],
  },
  innerContent: {
    transform: [{ rotate: '-120deg' }],
    alignItems: 'center',
  },
  chevronButton: {
    padding: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  disabled: {
    opacity: 0.3,
  },
  percentText: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 4,
  },
  streakText: {
    fontSize: 16,
    fontWeight: "500",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8,
  },
  completeBadge: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
});