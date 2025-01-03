// Path : app/(tabs)/_layout.tsx

import React from "react";
import { Tabs } from "expo-router";
import { Platform, useColorScheme, StyleSheet } from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function TabLayout() {
  const colorScheme = useColorScheme() || "light";
  const headerBackground = useThemeColor({}, "cardBackground");
  const headerTint = useThemeColor({}, "text");
  const colors = Colors[colorScheme];

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: headerBackground,
        },
        headerTintColor: headerTint,
        headerTitleStyle: {
          fontWeight: "700",
          fontSize: 20,
        },
        headerShadowVisible: false,
        headerTitleAlign: "left",
        headerLeftContainerStyle: {
          paddingLeft: 16,
        },
        headerRightContainerStyle: {
          paddingRight: 16,
        },
        tabBarActiveTintColor: colors.tint,
        tabBarInactiveTintColor: colors.tabIconDefault,
        tabBarStyle: {
          ...styles.tabBar,
          backgroundColor: colors.cardBackground,
          borderTopColor: `${colors.divider}66`,
          ...(Platform.OS === 'ios' ? styles.tabBarIOS : {}),
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
          marginBottom: Platform.OS === 'ios' ? 0 : 4,
        },
        tabBarIconStyle: {
          marginTop: Platform.OS === 'ios' ? 4 : 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <IconSymbol size={24} name="calendar" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: "Progression",
          headerTitle: "Progression",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={24} name="chart.bar.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          headerTitle: "Profil",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={24} name="person" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: Platform.OS === 'ios' ? 88 : 64,
    paddingTop: 8, 
    paddingBottom: Platform.OS === 'ios' ? 28 : 8,
    borderTopWidth: 0.5,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  tabBarIOS: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
 });