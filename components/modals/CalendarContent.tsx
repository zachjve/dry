// Path : components/modals/CalendarContent.tsx

import React from "react";
import { StyleSheet, View } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useSobrietyStore } from "@/hooks/useSobrietyStore";
import { format, parseISO } from "date-fns";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ResetDataButton } from "../ResetDataButton";

export function CalendarContent() {
  const { days, stats, toggleDay } = useSobrietyStore();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const markedDates = days.reduce((acc, day) => {
    const formattedDate = format(parseISO(day.date), "yyyy-MM-dd");
    return {
      ...acc,
      [formattedDate]: {
        marked: true,
        dotColor: colors.success,
        selected: true,
        selectedColor: `${colors.success}22`,
        selectedTextColor: colors.success,
      },
    };
  }, {});

  const calendarTheme = {
    backgroundColor: 'transparent',
    calendarBackground: 'transparent',
    
    // Headers
    textSectionTitleColor: colors.icon,
    textSectionTitleDisabledColor: colors.calendarDisabled,
    
    // Days
    dayTextColor: colors.text,
    textDisabledColor: colors.calendarDisabled,
    todayTextColor: colors.tint,
    todayBackgroundColor: `${colors.tint}15`,
    
    // Selection
    selectedDayBackgroundColor: `${colors.success}22`,
    selectedDayTextColor: colors.success,
    
    // Dots
    dotColor: colors.success,
    selectedDotColor: colors.success,
    
    // Navigation
    arrowColor: colors.tint,
    monthTextColor: colors.text,
    
    // Style
    textMonthFontWeight: "700",
    textDayFontSize: 16,
    textMonthFontSize: 20,
    textDayHeaderFontSize: 14,
    textDayHeaderFontWeight: "600",
  };

  const onDaySelect = (day: DateData) => {
    const targetDate = new Date(day.dateString);
    const today = new Date();
    
    // Prevent selecting future dates
    if (targetDate > today) return;

    toggleDay(day.dateString);
  };

  const stats_data = [
    {
      value: stats.currentStreak,
      label: "Série actuelle",
      icon: "local-fire-department",
      color: colors.tint
    },
    {
      value: stats.bestStreak,
      label: "Record",
      icon: "emoji-events",
      color: colors.achievementActive
    },
    {
      value: stats.totalSoberDays,
      label: "Total",
      icon: "calendar-today",
      color: colors.success
    }
  ];

  return (
    <ThemedView style={styles.container}>
      {/* Statistics */}
      <View style={styles.statsRow}>
        {stats_data.map((stat) => (
          <View 
            key={stat.label}
            style={[
              styles.statCard,
              { backgroundColor: `${stat.color}15` }
            ]}
          >
            <MaterialIcons 
              name={stat.icon as "local-fire-department" | "emoji-events" | "calendar-today"}
              size={24}
              color={stat.color}
              style={styles.statIcon}
            />
            <ThemedText style={styles.statValue}>
              {stat.value}
            </ThemedText>
            <ThemedText style={[styles.statLabel, { color: colors.icon }]}>
              {stat.label}
            </ThemedText>
          </View>
        ))}
      </View>

      {/* Separator */}
      <View style={[styles.divider, { backgroundColor: colors.divider }]} />

      {/* Calendar */}
      <View style={styles.calendarContainer}>
        <Calendar
          theme={calendarTheme}
          markedDates={markedDates}
          onDayPress={onDaySelect}
          enableSwipeMonths
          hideExtraDays
          firstDay={1}
          maxDate={format(new Date(), 'yyyy-MM-dd')}
        />
      </View>      
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  statIcon: {
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    fontWeight: "500",
  },
  divider: {
    height: 1,
    marginBottom: 24,
    opacity: 0.5,
  },
  calendarContainer: {
    borderRadius: 16,
    overflow: 'hidden',
  },
});