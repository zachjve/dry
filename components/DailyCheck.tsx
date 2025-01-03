// Path : components/DailyCheck.tsx

import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { useSobrietyStore } from "@/hooks/useSobrietyStore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { format } from "date-fns";

export function DailyCheck() {
  const { toggleDay, days } = useSobrietyStore();
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  
  const todayString = format(new Date(), "yyyy-MM-dd");
  const isTodayValidated = days.some(day => 
    day.date.startsWith(todayString)
  );

  useEffect(() => {
    if (!isTodayValidated) {
      toggleDay(todayString);
    }
  }, []);

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    toggleDay(todayString);
  };

  return (
    <Animated.View 
      style={[styles.container, { transform: [{ scale: scaleAnim }] }]}
    >
      <TouchableOpacity
        style={[
          styles.card,
          {
            backgroundColor: colors.cardBackground,
            borderColor: colors.cardBorder,
          },
          !isTodayValidated && {
            backgroundColor: colorScheme === 'light' ? colors.highlight : `${colors.highlight}22`,
            borderColor: colors.error,
          }
        ]}
        onPress={handlePress}
        activeOpacity={0.9}
      >
        <View style={styles.content}>
          <View style={styles.iconWrapper}>
            <MaterialIcons
              name={isTodayValidated ? "check-circle" : "cancel"}
              size={32}
              color={isTodayValidated ? colors.success : colors.error}
            />
          </View>
          
          <Text style={[
            styles.mainText,
            { color: isTodayValidated ? colors.success : colors.error }
          ]}>
            {isTodayValidated ? "Journée sobre" : "J'ai bu aujourd'hui"}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainText: {
    fontSize: 18,
    fontWeight: "600",
  },
});