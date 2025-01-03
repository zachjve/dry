// Path : components/HeaderStreak.tsx

import React from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { useSobrietyStore } from "@/hooks/useSobrietyStore";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

export function HeaderStreak() {
  const { stats } = useSobrietyStore();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  
  React.useEffect(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [stats.currentStreak]);

  const getStreakEmoji = (streak: number) => {
    if (streak >= 30) return "🏆";
    if (streak >= 15) return "⭐️";
    if (streak >= 7) return "🔥";
    return "💪";
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <View style={styles.streakRow}>
          <Text style={styles.emoji}>{getStreakEmoji(stats.currentStreak)}</Text>
          <Animated.View 
            style={[
              styles.streakBadge,
              { 
                transform: [{ scale: scaleAnim }],
                backgroundColor: colorScheme === 'light' 
                  ? "rgba(255, 255, 255, 0.6)"
                  : "rgba(0, 0, 0, 0.4)"
              }
            ]}
          >
            <Text style={[styles.streakText, { color: colors.text }]}>
              {stats.currentStreak}
              <Text style={[styles.streakUnit, { color: colors.text }]}> jours</Text>
            </Text>
          </Animated.View>
        </View>
        
        <View style={[
          styles.separator, 
          { 
            backgroundColor: colorScheme === 'light' 
              ? "rgba(255, 255, 255, 0.5)" 
              : "rgba(0, 0, 0, 0.2)" 
          }
        ]} />
        
        <Text style={[styles.label, { color: colors.text }]}>
          SÉRIE EN COURS
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  mainContent: {
    alignItems: "center",
  },
  streakRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  emoji: {
    fontSize: 48,
  },
  streakBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 100,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  streakText: {
    fontSize: 32,
    fontWeight: "800",
  },
  streakUnit: {
    fontSize: 18,
    fontWeight: "600",
  },
  separator: {
    width: 40,
    height: 1,
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 1,
    opacity: 0.9,
    textTransform: "uppercase",
  },
});