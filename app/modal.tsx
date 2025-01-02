// Path : app/modal.tsx

import { StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { CalendarContent } from "@/components/modals/CalendarContent";

export type ModalType = "calendar";

export default function ModalScreen() {
  const { type } = useLocalSearchParams<{ type: ModalType }>();

  const renderContent = () => {
    switch (type) {
      case "calendar":
        return <CalendarContent />;
      default:
        return null;
    }
  };

  return <ThemedView style={styles.container}>{renderContent()}</ThemedView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
