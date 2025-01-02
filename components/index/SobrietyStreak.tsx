// Path : components/index/SobrietyStreak.tsx

import { StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

type Props = {
  streak: number;
};

export function SobrietyStreak({ streak }: Props) {
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(1) }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.streakContainer, animatedStyles]}>
        <ThemedText type="defaultSemiBold" style={styles.streakText}>
          Série actuelle
        </ThemedText>
        <ThemedText style={styles.streakNumber}>{streak}</ThemedText>
        <ThemedText style={styles.streakLabel}>
          {streak === 1 ? "JOUR" : "JOURS"}
        </ThemedText>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  streakContainer: {
    alignItems: "center",
    paddingBottom: 20,
  },
  streakText: {
    fontSize: 18,
    marginBottom: 8,
  },
  streakNumber: {
    fontSize: 72,
    fontWeight: "bold",
  },
  streakLabel: {
    fontSize: 24,
    fontWeight: "500",
    opacity: 0.8,
  },
});
