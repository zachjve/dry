// Path : app/(tabs)/settings.tsx

import { StyleSheet } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useSobrietyStore } from "@/hooks/useSobrietyStore";

export default function SettingsScreen() {
  const { goals, updateGoal } = useSobrietyStore();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <ThemedView style={styles.headerContent}>
          {/* TODO: Ajouter une illustration des paramètres */}
        </ThemedView>
      }
    >
      <ThemedView style={styles.container}>
        <ThemedText type="title">Paramètres</ThemedText>
        {/* TODO: Ajouter les paramètres de l'app */}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
  headerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
