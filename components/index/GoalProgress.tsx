// Path : components/index/GoalProgress.tsx

import { StyleSheet } from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { useSobrietyStore } from "@/hooks/useSobrietyStore";
import { useThemeColor } from "@/hooks/useThemeColor";

export function GoalProgress() {
  const { stats, goals } = useSobrietyStore();
  const progressBackgroundColor = useThemeColor({}, "progressBackground");
  const progressFillColor = useThemeColor({}, "progressFill");

  const progress = Math.min(
    Math.round((stats.currentStreak / goals.targetDays) * 100),
    100
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle">
        Objectif : {goals.targetDays} jours
      </ThemedText>
      <ThemedView
        style={[
          styles.progressBar,
          { backgroundColor: progressBackgroundColor },
        ]}
      >
        <ThemedView
          style={[
            styles.progressFill,
            {
              width: `${progress}%`,
              backgroundColor: progressFillColor,
            },
          ]}
        />
      </ThemedView>
      <ThemedText style={styles.progressText}>
        {progress}% de votre objectif atteint !
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    padding: 16,
    borderRadius: 12,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  progressText: {
    textAlign: "center",
    opacity: 0.8,
  },
});
