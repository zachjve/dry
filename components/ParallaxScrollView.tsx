// Path : components/ParallaxScrollView.tsx

import type { PropsWithChildren, ReactElement } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

import { ThemedView } from "@/components/ThemedView";
import { useBottomTabOverflow } from "@/components/ui/TabBarBackground";

const HEADER_HEIGHT = 275;

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerRight?: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
}>;

export default function ParallaxScrollView({
  children,
  headerImage,
  headerRight,
  headerBackgroundColor,
}: Props) {
  const colorScheme = useColorScheme() ?? "light";
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const bottom = useBottomTabOverflow();

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  const headerRightAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, HEADER_HEIGHT / 2], [1, 0]),
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [0, HEADER_HEIGHT],
            [0, HEADER_HEIGHT * 0.25]
          ),
        },
      ],
    };
  });

  // Offset pour le contenu
  const offsetFromBottom = HEADER_HEIGHT * 0.15;

  // Couleurs du dégradé selon le thème
  const gradientColors = colorScheme === 'light' 
    ? [Colors.light.tint, Colors.light.achievementActive] 
    : [Colors.dark.tint, Colors.dark.achievementActive];

  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom }}
        contentContainerStyle={{ paddingBottom: bottom }}
      >
        <Animated.View
          style={[styles.header, headerAnimatedStyle]}
        >
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />

          <Animated.View
            style={[
              styles.headerInner,
              { paddingBottom: offsetFromBottom },
            ]}
          >
            {headerImage}
          </Animated.View>

          {headerRight && (
            <Animated.View
              style={[styles.headerRight, headerRightAnimatedStyle]}
            >
              {headerRight}
            </Animated.View>
          )}
        </Animated.View>

        <ThemedView style={styles.content}>
          {children}
        </ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: "hidden",
  },
  headerInner: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  headerRight: {
    position: "absolute",
    right: 16,
    top: 48,
    zIndex: 10,
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
  },
});