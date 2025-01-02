// Path : app/(tabs)/progress.tsx

import { StyleSheet } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useSobrietyStore } from "@/hooks/useSobrietyStore";

export default function ProgressScreen() {
  const { stats } = useSobrietyStore();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <ThemedView style={styles.headerStats}>
          <ThemedText style={styles.headerTitle}>Record personnel</ThemedText>
          <ThemedText style={styles.headerValue}>
            {stats.bestStreak} jours
          </ThemedText>
        </ThemedView>
      }
    >
      <ThemedView style={styles.container}>
        <ThemedText type="title">Statistiques</ThemedText>
        {/* TODO: Ajouter les stats détaillées et graphiques */}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
  headerStats: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    opacity: 0.8,
  },
  headerValue: {
    fontSize: 48,
    fontWeight: "bold",
  },
});
