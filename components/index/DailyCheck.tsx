// Path : components/index/DailyCheck.tsx

import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { IconSymbol } from "../ui/IconSymbol";
import { useSobrietyStore } from "@/hooks/useSobrietyStore";
import * as Haptics from "expo-haptics";
import { useThemeColor } from "@/hooks/useThemeColor";

export function DailyCheck() {
  const { addDay, canCheckIn } = useSobrietyStore();
  const successColor = useThemeColor({}, "success");
  const inactiveColor = useThemeColor({}, "achievementInactive");

  const handleCheck = async () => {
    if (!canCheckIn()) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      return;
    }

    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    addDay({
      date: new Date().toISOString(),
      completed: true,
    });
  };

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity
        style={[
          styles.checkButton,
          !canCheckIn() && styles.checkButtonDisabled,
        ]}
        onPress={handleCheck}
      >
        <IconSymbol
          name={canCheckIn() ? "circle" : "checkmark.circle.fill"}
          size={64}
          color={canCheckIn() ? successColor : inactiveColor}
        />
        <ThemedText style={styles.buttonText}>
          {canCheckIn() ? "Valider ma journée" : "Déjà validé aujourd'hui !"}
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 20,
  },
  checkButton: {
    alignItems: "center",
    gap: 12,
    opacity: 1,
  },
  checkButtonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
  },
});
