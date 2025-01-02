// Path : components/modals/CalendarContent.tsx

import { StyleSheet, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useSobrietyStore } from "@/hooks/useSobrietyStore";
import { format, parseISO } from "date-fns";
import { useThemeColor } from "@/hooks/useThemeColor";

export function CalendarContent() {
  const { days, stats } = useSobrietyStore();
  const textColor = useThemeColor({}, "text");
  const successColor = useThemeColor({}, "success");
  const disabledColor = useThemeColor({}, "calendarDisabled");
  const calendarTextColor = useThemeColor({}, "calendarText");
  const modalText = useThemeColor({}, "modalText");

  // Préparer les dates marquées
  const markedDates = days.reduce((acc, day) => {
    const formattedDate = format(parseISO(day.date), "yyyy-MM-dd");
    return {
      ...acc,
      [formattedDate]: {
        marked: true,
        dotColor: successColor,
        selected: true,
        selectedColor: successColor,
      },
    };
  }, {});

  // Thème du calendrier selon le mode
  const calendarTheme = {
    backgroundColor: "transparent",
    calendarBackground: "transparent",
    textSectionTitleColor: calendarTextColor,
    selectedDayBackgroundColor: successColor,
    selectedDayTextColor: textColor,
    todayTextColor: successColor,
    dayTextColor: calendarTextColor,
    textDisabledColor: disabledColor,
    dotColor: successColor,
    selectedDotColor: textColor,
    arrowColor: modalText,
    monthTextColor: modalText,
    textMonthFontWeight: "bold" as const,
    textDayFontSize: 16,
    textMonthFontSize: 18,
  };

  return (
    <ThemedView style={styles.container}>
      {/* Statistiques */}
      <ThemedView
        style={[
          styles.statsContainer,
          {
            borderColor: useThemeColor({}, "calendarDisabled"),
          },
        ]}
      >
        <View style={styles.statItem}>
          <ThemedText style={styles.statValue}>
            {stats.currentStreak}
          </ThemedText>
          <ThemedText style={styles.statLabel}>Série actuelle</ThemedText>
        </View>
        <View style={styles.statItem}>
          <ThemedText style={styles.statValue}>{stats.bestStreak}</ThemedText>
          <ThemedText style={styles.statLabel}>Record</ThemedText>
        </View>
        <View style={styles.statItem}>
          <ThemedText style={styles.statValue}>
            {stats.totalSoberDays}
          </ThemedText>
          <ThemedText style={styles.statLabel}>Total</ThemedText>
        </View>
      </ThemedView>

      {/* Calendrier */}
      <Calendar
        theme={calendarTheme}
        markedDates={markedDates}
        enableSwipeMonths
        hideExtraDays
        firstDay={1}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    opacity: 0.6,
  },
});
