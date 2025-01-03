// app/(tabs)/index.tsx
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { HeaderStreak } from "@/components/HeaderStreak";
import { DailyCheck } from "@/components/DailyCheck";
import { CircularProgressObjectives } from "@/components/CircularProgressObjectives";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useSobrietyStore } from "@/hooks/useSobrietyStore";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";

const MILESTONES = [3, 7, 15, 30, 45, 60, 90];

export default function HomeScreen() {
  const router = useRouter();
  const { stats } = useSobrietyStore();
  const textColor = useThemeColor({}, "text");
  const colorScheme = useColorScheme() ?? 'light';

  const openCalendar = () => {
    router.push("/modal");
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: Colors.light.headerBackground,
        dark: Colors.dark.headerBackground,
      }}
      headerImage={<HeaderStreak />}
      headerRight={
        <TouchableOpacity
          onPress={openCalendar}
          style={[
            styles.calendarButton,
            {
              backgroundColor: colorScheme === 'dark' 
                ? 'rgba(0, 0, 0, 0.4)' 
                : 'rgba(255, 255, 255, 0.6)'
            }
          ]}
        >
          <IconSymbol
            name="calendar"
            size={24}
            color={textColor}
          />
        </TouchableOpacity>
      }
    >
      <ThemedView style={styles.container}>
        <DailyCheck />
        <CircularProgressObjectives
          milestones={MILESTONES}
          currentStreak={stats.currentStreak}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
    paddingHorizontal: 16,
  },
  calendarButton: {
    padding: 12,
    borderRadius: 12,
    marginTop: 16,
  },
});