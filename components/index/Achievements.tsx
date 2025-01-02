// Path : components/index/Achievements.tsx

import { StyleSheet, View } from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { IconSymbol } from "../ui/IconSymbol";
import { useSobrietyStore } from "@/hooks/useSobrietyStore";
import { useThemeColor } from "@/hooks/useThemeColor";

const MILESTONES = [7, 30, 45, 60, 90];

export function Achievements() {
  const { stats } = useSobrietyStore();
  const activeColor = useThemeColor({}, "achievementActive");
  const inactiveColor = useThemeColor({}, "achievementInactive");

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Objectifs</ThemedText>
      <View style={styles.badgesContainer}>
        {MILESTONES.map((days) => {
          const isAchieved = stats.currentStreak >= days;
          return (
            <View key={days} style={styles.badge}>
              <IconSymbol
                name={isAchieved ? "flame.fill" : "flame"}
                size={32}
                color={isAchieved ? activeColor : inactiveColor}
              />
              <ThemedText
                style={[
                  styles.badgeText,
                  isAchieved && styles.badgeTextAchieved,
                ]}
              >
                {days}j
              </ThemedText>
            </View>
          );
        })}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
  },
  badgesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    flexWrap: "wrap",
    gap: 16,
  },
  badge: {
    alignItems: "center",
    gap: 4,
  },
  badgeText: {
    fontSize: 14,
    opacity: 0.6,
  },
  badgeTextAchieved: {
    opacity: 1,
    fontWeight: "600",
  },
});
