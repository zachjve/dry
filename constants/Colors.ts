/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

// Path : constants/Colors.ts

const amberBase = "#F59E0B"; // Amber-500 de Tailwind
const amberDark = "#B45309"; // Amber-700 de Tailwind

export const Colors = {
  light: {
    text: "#292524", // Warm-gray-800
    background: "#FFFBEB", // Amber-50
    tint: amberDark,
    icon: "#78716C", // Warm-gray-500
    tabIconDefault: "#78716C", // Warm-gray-500
    tabIconSelected: amberDark,
    modalBackground: "#FEF3C7", // Amber-100
    headerBackground: "#FEF3C7", // Amber-100
    modalText: "#292524", // Warm-gray-800
    achievementActive: amberBase,
    achievementInactive: "#D6D3D1", // Warm-gray-300
    success: "#059669", // Emerald-600
    calendarText: "#44403C", // Warm-gray-700
    calendarDisabled: "#A8A29E", // Warm-gray-400
    progressBackground: "#FDE68A", // Amber-200
    progressFill: amberDark,
  },
  dark: {
    text: "#FAFAF9", // Warm-gray-50
    background: "#1C1917", // Warm-gray-900
    tint: amberBase,
    icon: "#A8A29E", // Warm-gray-400
    tabIconDefault: "#A8A29E", // Warm-gray-400
    tabIconSelected: amberBase,
    modalBackground: "#292524", // Warm-gray-800
    headerBackground: "#78350F", // Amber-900
    modalText: "#FAFAF9", // Warm-gray-50
    achievementActive: amberBase,
    achievementInactive: "#78716C", // Warm-gray-500
    success: "#34D399", // Emerald-400
    calendarText: "#E7E5E4", // Warm-gray-200
    calendarDisabled: "#57534E", // Warm-gray-600
    progressBackground: "#44403C", // Warm-gray-700
    progressFill: amberBase,
  },
};
