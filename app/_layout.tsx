// Path : app/_layout.tsx

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useSobrietyStore } from '@/hooks/useSobrietyStore';
import { Onboarding } from '@/components/onboarding/Onboarding';
import AsyncStorage from "@react-native-async-storage/async-storage";

type ModalParams = {
  type: "calendar";
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor({}, "modalBackground");
  const textColor = useThemeColor({}, "modalText");
  const tintColor = useThemeColor({}, "tint");
  const { profile } = useSobrietyStore();
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    // Temporaire pour dev : décommentez pour réinitialiser
    AsyncStorage.clear();

    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const hasLaunched = await AsyncStorage.getItem('hasLaunched');
        if (hasLaunched) {
          setShowOnboarding(false);
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setShowOnboarding(false);
        setIsLoading(false);
      }
    };

    checkFirstLaunch();
  }, []);

  if (!loaded || isLoading) {
    return null;
  }

  if (showOnboarding) {
    return (
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Onboarding onComplete={async () => {
          await AsyncStorage.setItem('hasLaunched', 'true');
          setShowOnboarding(false);
        }} />
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      </ThemeProvider>
    );
  }

  const getModalTitle = (type: string | undefined) => {
    switch (type) {
      case "calendar":
        return "Calendrier";
      default:
        return "";
    }
  };

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="modal"
          options={({ route }) => ({
            presentation: "modal",
            animation: "slide_from_bottom",
            headerStyle: {
              backgroundColor: backgroundColor,
            },
            headerTintColor: tintColor,
            headerTitleStyle: {
              fontWeight: "700",
              fontSize: 18,
            },
            contentStyle: {
              backgroundColor: backgroundColor,
            },
            headerShadowVisible: false,
            headerBackTitle: "Retour",
            title: getModalTitle((route.params as ModalParams)?.type),
            headerLeft: () => null,
          })}
        />
        <Stack.Screen
          name="+not-found"
          options={{ headerShown: false }}
        />
      </Stack>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </ThemeProvider>
  );
}