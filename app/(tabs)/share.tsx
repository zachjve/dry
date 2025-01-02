// Path : app/(tabs)/share.tsx

import { StyleSheet } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function ShareScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <ThemedView style={styles.headerContent}>
          {/* TODO: Ajouter aperçu du partage */}
        </ThemedView>
      }
    >
      <ThemedView style={styles.container}>
        <ThemedText type="title">Partager</ThemedText>
        {/* TODO: Ajouter les options de partage */}
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
