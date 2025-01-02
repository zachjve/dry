// Path : components/ParallaxScrollView.tsx

import type { PropsWithChildren, ReactElement } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";

import { ThemedView } from "@/components/ThemedView";
import { useBottomTabOverflow } from "@/components/ui/TabBarBackground";
import { useColorScheme } from "@/hooks/useColorScheme";

const HEADER_HEIGHT = 250;

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

  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom }}
        contentContainerStyle={{ paddingBottom: bottom }}
      >
        <Animated.View
          style={[
            styles.header,
            { backgroundColor: headerBackgroundColor[colorScheme] },
            headerAnimatedStyle,
          ]}
        >
          {headerImage}
          {headerRight && (
            <Animated.View
              style={[styles.headerRight, headerRightAnimatedStyle]}
            >
              {headerRight}
            </Animated.View>
          )}
        </Animated.View>
        <ThemedView style={styles.content}>{children}</ThemedView>
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
    overflow: "hidden",
  },
});
