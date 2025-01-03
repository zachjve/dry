// Path : app/modal.tsx

import React from "react";
import { StyleSheet } from "react-native";
import { CalendarContent } from "@/components/modals/CalendarContent";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

export default function CalendarModalScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <ThemedView style={[
      styles.container,
      { backgroundColor: colors.modalBackground }
    ]}>
      <CalendarContent />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});