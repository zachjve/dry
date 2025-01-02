// Path : app/(tabs)/index.tsx

import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { SobrietyStreak } from "@/components/index/SobrietyStreak";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { DailyCheck } from "@/components/index/DailyCheck";
import { Achievements } from "@/components/index/Achievements";
import { useSobrietyStore } from "@/hooks/useSobrietyStore";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function HomeScreen() {
  const { stats } = useSobrietyStore();
  const router = useRouter();
  const headerBackgroundColor = useThemeColor({}, "headerBackground");
  const textColor = useThemeColor({}, "modalText");

  const openCalendar = () => {
    router.push({
      pathname: "/modal",
      params: { type: "calendar" },
    });
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: headerBackgroundColor,
        dark: headerBackgroundColor,
      }}
      headerImage={<SobrietyStreak streak={stats.currentStreak} />}
      headerRight={
        <TouchableOpacity onPress={openCalendar} style={styles.calendarButton}>
          <IconSymbol name="calendar" size={24} color={textColor} />
        </TouchableOpacity>
      }
    >
      <ThemedView style={styles.container}>
        <ThemedText type="title">Aujourd'hui</ThemedText>
        <DailyCheck />
        <Achievements />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
  calendarButton: {
    padding: 8,
  },
});
