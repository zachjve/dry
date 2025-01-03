// IconSymbol.tsx

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolWeight } from "expo-symbols";
import React from "react";
import { OpaqueColorValue, StyleProp, TextStyle } from "react-native";

const MAPPING = {
  "house.fill": "home",
  "calendar": "event",
  "chart.bar.fill": "bar-chart",
  "square.and.arrow.up": "share",
  "gear": "settings",
  "check.circle": "check-circle",
  "radio.button.unchecked": "radio-button-unchecked",
  "person": "person",
  "chart": "bar-chart",
  "house": "home"
} as const;

export type IconSymbolName = keyof typeof MAPPING;

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  weight,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return (
    <MaterialIcons
      color={color}
      size={size}
      name={MAPPING[name]}
      style={style}
    />
  );
}